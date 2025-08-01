const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

const db = admin.firestore();

// API Sources configuration
const API_SOURCES = [
  {
    name: 'Quotable',
    url: 'https://api.quotable.io/quotes/random?limit=50',
    transform: (data) => data.results || data,
    extract: (quote) => ({
      text: quote.content,
      author: quote.author,
      ko: '',
      tags: quote.tags || [],
      createdAt: admin.firestore.Timestamp.now()
    }),
    rateLimit: 180, // requests per minute
    timeout: 5000
  },
  {
    name: 'ZenQuotes',
    url: 'https://zenquotes.io/api/quotes',
    transform: (data) => data,
    extract: (quote) => ({
      text: quote.q,
      author: quote.a,
      ko: '',
      tags: [],
      createdAt: admin.firestore.Timestamp.now()
    }),
    rateLimit: 10, // 30 seconds per 5 requests
    timeout: 5000
  },
  {
    name: 'QuoteGarden',
    url: 'https://quote-garden.onrender.com/api/v3/quotes/random?count=50',
    transform: (data) => data.data || data,
    extract: (quote) => ({
      text: quote.quoteText,
      author: quote.quoteAuthor,
      ko: '',
      tags: quote.quoteGenre ? [quote.quoteGenre] : [],
      createdAt: admin.firestore.Timestamp.now()
    }),
    rateLimit: 100,
    timeout: 8000
  },
  {
    name: 'FavQs',
    url: 'https://favqs.com/api/qotd',
    transform: (data) => [data.quote],
    extract: (quote) => ({
      text: quote.body,
      author: quote.author,
      ko: '',
      tags: quote.tags || [],
      createdAt: admin.firestore.Timestamp.now()
    }),
    rateLimit: 90, // 20 seconds per 30 requests
    timeout: 5000
  }
];

// Helper function to fetch quotes from multiple sources
async function fetchQuotesFromSources() {
  const allQuotes = [];
  
  for (const source of API_SOURCES) {
    try {
      console.log(`Fetching quotes from ${source.name}...`);
      
      const response = await axios.get(source.url, {
        timeout: source.timeout,
        headers: {
          'User-Agent': 'DailyQuoteBot/1.0'
        }
      });
      
      const rawData = response.data;
      const transformedData = source.transform(rawData);
      const quotes = transformedData.map(quote => source.extract(quote));
      
      console.log(`Successfully fetched ${quotes.length} quotes from ${source.name}`);
      allQuotes.push(...quotes);
      
      // Add small delay between API calls to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error fetching from ${source.name}:`, error.message);
      continue; // Try next source
    }
  }
  
  return allQuotes;
}

// Weekly update function - runs every Monday at midnight
exports.weeklyUpdate = functions.pubsub.schedule('0 0 * * MON').onRun(async (context) => {
  try {
    console.log('Starting weekly quote update...');
    
    // Fetch quotes from multiple sources
    const quotes = await fetchQuotesFromSources();
    
    if (quotes.length === 0) {
      console.error('No quotes fetched from any source');
      return;
    }
    
    console.log(`Total quotes fetched: ${quotes.length}`);
    
    // Remove duplicates based on text content
    const uniqueQuotes = quotes.filter((quote, index, self) => 
      index === self.findIndex(q => q.text === quote.text)
    );
    
    console.log(`Unique quotes after deduplication: ${uniqueQuotes.length}`);
    
    // Batch add to Firestore
    const batch = db.batch();
    const addedQuotes = [];
    
    uniqueQuotes.forEach(quote => {
      const docRef = db.collection('quotes').doc();
      batch.set(docRef, quote);
      addedQuotes.push({
        ...quote,
        id: docRef.id
      });
    });
    
    await batch.commit();
    console.log(`Added ${addedQuotes.length} quotes to Firestore`);
    
    // Pick one random quote for today
    const randomQuote = addedQuotes[Math.floor(Math.random() * addedQuotes.length)];
    
    // Update meta/todayQuote
    await db.collection('meta').doc('todayQuote').set({
      quoteId: randomQuote.id,
      updatedAt: admin.firestore.Timestamp.now(),
      source: 'weekly_update'
    });
    
    console.log(`Selected today's quote: "${randomQuote.text}" by ${randomQuote.author}`);
    console.log('Weekly update completed successfully');
    
  } catch (error) {
    console.error('Error in weekly update:', error);
  }
});

// Daily quote refresh function - runs every day at 6 AM
exports.dailyQuoteRefresh = functions.pubsub.schedule('0 6 * * *').onRun(async (context) => {
  try {
    console.log('Starting daily quote refresh...');
    
    // Fetch a few quotes from random sources
    const randomSources = API_SOURCES.sort(() => 0.5 - Math.random()).slice(0, 2);
    const quotes = [];
    
    for (const source of randomSources) {
      try {
        const response = await axios.get(source.url, {
          timeout: source.timeout,
          headers: {
            'User-Agent': 'DailyQuoteBot/1.0'
          }
        });
        
        const rawData = response.data;
        const transformedData = source.transform(rawData);
        const sourceQuotes = transformedData.map(quote => source.extract(quote));
        
        quotes.push(...sourceQuotes);
        
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error.message);
        continue;
      }
    }
    
    if (quotes.length > 0) {
      // Pick one random quote for today
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      
      // Add to Firestore
      const docRef = db.collection('quotes').doc();
      await docRef.set(randomQuote);
      
      // Update meta/todayQuote
      await db.collection('meta').doc('todayQuote').set({
        quoteId: docRef.id,
        updatedAt: admin.firestore.Timestamp.now(),
        source: 'daily_refresh'
      });
      
      console.log(`Updated today's quote: "${randomQuote.text}" by ${randomQuote.author}`);
    }
    
    console.log('Daily quote refresh completed');
    
  } catch (error) {
    console.error('Error in daily quote refresh:', error);
  }
});

// Daily push notification function - runs every day at 11 PM
exports.dailyPush = functions.pubsub.schedule('0 23 * * *').onRun(async (context) => {
  try {
    console.log('Starting daily push notification...');
    
    // Get today's quote
    const todayQuoteDoc = await db.collection('meta').doc('todayQuote').get();
    if (!todayQuoteDoc.exists) {
      console.log('No today quote found');
      return;
    }
    
    const todayQuote = todayQuoteDoc.data();
    const quoteDoc = await db.collection('quotes').doc(todayQuote.quoteId).get();
    
    if (!quoteDoc.exists) {
      console.log('Quote not found');
      return;
    }
    
    const quote = quoteDoc.data();
    
    // Get all FCM tokens
    const usersSnapshot = await db.collection('users').get();
    const tokens = [];
    
    for (const userDoc of usersSnapshot.docs) {
      const tokensSnapshot = await userDoc.ref.collection('tokens').doc('fcm').get();
      if (tokensSnapshot.exists) {
        const tokenData = tokensSnapshot.data();
        if (tokenData && tokenData.token) {
          tokens.push(tokenData.token);
        }
      }
    }
    
    if (tokens.length === 0) {
      console.log('No FCM tokens found');
      return;
    }
    
    // Send push notification
    const message = {
      notification: {
        title: '오늘의 명언',
        body: `"${quote.text}" — ${quote.author}`
      },
      data: {
        quoteId: todayQuote.quoteId,
        type: 'daily_quote',
        source: todayQuote.source || 'unknown'
      },
      tokens: tokens
    };
    
    const response = await admin.messaging().sendMulticast(message);
    console.log(`Successfully sent messages: ${response.successCount}/${tokens.length}`);
    
    if (response.failureCount > 0) {
      console.log('Failed tokens:', response.responses.map((resp, idx) => 
        !resp.success ? tokens[idx] : null
      ).filter(Boolean));
    }
    
  } catch (error) {
    console.error('Error in daily push:', error);
  }
});

// Manual quote fetch function (for testing)
exports.manualQuoteFetch = functions.https.onRequest(async (req, res) => {
  try {
    const quotes = await fetchQuotesFromSources();
    
    if (quotes.length === 0) {
      res.status(500).json({ error: 'No quotes fetched' });
      return;
    }
    
    // Pick one random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Add to Firestore
    const docRef = db.collection('quotes').doc();
    await docRef.set(randomQuote);
    
    res.json({
      success: true,
      quote: {
        id: docRef.id,
        ...randomQuote
      },
      totalFetched: quotes.length
    });
    
  } catch (error) {
    console.error('Error in manual quote fetch:', error);
    res.status(500).json({ error: error.message });
  }
}); 

// Bulk quote fetch function (for initial data setup)
exports.bulkQuoteFetch = functions.https.onRequest(async (req, res) => {
  try {
    console.log('Starting bulk quote fetch...');
    
    const quotes = await fetchQuotesFromSources();
    
    if (quotes.length === 0) {
      res.status(500).json({ error: 'No quotes fetched' });
      return;
    }
    
    // Remove duplicates
    const uniqueQuotes = quotes.filter((quote, index, self) => 
      index === self.findIndex(q => q.text === quote.text)
    );
    
    console.log(`Fetched ${quotes.length} quotes, ${uniqueQuotes.length} unique`);
    
    // Batch add to Firestore
    const batch = db.batch();
    const addedQuotes = [];
    
    uniqueQuotes.forEach(quote => {
      const docRef = db.collection('quotes').doc();
      batch.set(docRef, quote);
      addedQuotes.push({
        id: docRef.id,
        ...quote
      });
    });
    
    await batch.commit();
    
    // Pick one for today's quote
    const todayQuote = addedQuotes[Math.floor(Math.random() * addedQuotes.length)];
    
    // Update meta/todayQuote
    await db.collection('meta').doc('todayQuote').set({
      quoteId: todayQuote.id,
      updatedAt: admin.firestore.Timestamp.now(),
      source: 'bulk_fetch'
    });
    
    res.json({
      success: true,
      totalFetched: quotes.length,
      uniqueAdded: addedQuotes.length,
      todayQuote: {
        id: todayQuote.id,
        text: todayQuote.text,
        author: todayQuote.author
      },
      allQuotes: addedQuotes.map(q => ({
        id: q.id,
        text: q.text,
        author: q.author
      }))
    });
    
  } catch (error) {
    console.error('Error in bulk quote fetch:', error);
    res.status(500).json({ error: error.message });
  }
}); 