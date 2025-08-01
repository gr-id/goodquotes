const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

const db = admin.firestore();

// Weekly update function - runs every Monday at midnight
exports.weeklyUpdate = functions.pubsub.schedule('0 0 * * MON').onRun(async (context) => {
  try {
    // Fetch quotes from quotable.io
    const response = await axios.get('https://api.quotable.io/quotes?limit=50');
    const quotes = response.data.results || [];
    
    if (quotes.length === 0) {
      // Fallback to ZenQuotes if quotable.io fails
      const zenResponse = await axios.get('https://zenquotes.io/api/quotes');
      const zenQuotes = zenResponse.data || [];
      
      // Convert ZenQuotes format to our format
      const convertedQuotes = zenQuotes.map(quote => ({
        text: quote.q,
        author: quote.a,
        ko: '',
        tags: [],
        createdAt: admin.firestore.Timestamp.now()
      }));
      
      // Batch add to Firestore
      const batch = db.batch();
      convertedQuotes.forEach(quote => {
        const docRef = db.collection('quotes').doc();
        batch.set(docRef, quote);
      });
      await batch.commit();
      
      // Pick one random quote for today
      const randomQuote = convertedQuotes[Math.floor(Math.random() * convertedQuotes.length)];
      const randomDocRef = db.collection('quotes').doc();
      await randomDocRef.set(randomQuote);
      
      // Update meta/todayQuote
      await db.collection('meta').doc('todayQuote').set({
        quoteId: randomDocRef.id,
        updatedAt: admin.firestore.Timestamp.now()
      });
    } else {
      // Process quotable.io quotes
      const batch = db.batch();
      quotes.forEach(quote => {
        const docRef = db.collection('quotes').doc();
        batch.set(docRef, {
          text: quote.content,
          author: quote.author,
          ko: '',
          tags: quote.tags || [],
          createdAt: admin.firestore.Timestamp.now()
        });
      });
      await batch.commit();
      
      // Pick one random quote for today
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const randomDocRef = db.collection('quotes').doc();
      await randomDocRef.set({
        text: randomQuote.content,
        author: randomQuote.author,
        ko: '',
        tags: randomQuote.tags || [],
        createdAt: admin.firestore.Timestamp.now()
      });
      
      // Update meta/todayQuote
      await db.collection('meta').doc('todayQuote').set({
        quoteId: randomDocRef.id,
        updatedAt: admin.firestore.Timestamp.now()
      });
    }
    
    console.log('Weekly update completed successfully');
  } catch (error) {
    console.error('Error in weekly update:', error);
  }
});

// Daily push notification function - runs every day at 11 PM
exports.dailyPush = functions.pubsub.schedule('0 23 * * *').onRun(async (context) => {
  try {
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
        title: 'Today\'s Quote',
        body: `"${quote.text}" — ${quote.author}`
      },
      data: {
        quoteId: todayQuote.quoteId,
        type: 'daily_quote'
      },
      tokens: tokens
    };
    
    const response = await admin.messaging().sendMulticast(message);
    console.log(`Successfully sent messages: ${response.successCount}/${tokens.length}`);
    
  } catch (error) {
    console.error('Error in daily push:', error);
  }
}); 