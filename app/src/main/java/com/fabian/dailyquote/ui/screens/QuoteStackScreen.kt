package com.fabian.dailyquote.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.fabian.dailyquote.data.FirebaseService
import com.fabian.dailyquote.data.Quote
import com.fabian.dailyquote.ui.components.QuoteCard
import com.github.hukumister.lazycardstack.LazyCardStack
import com.github.hukumister.lazycardstack.rememberLazyCardStackState
import kotlinx.coroutines.launch

@Composable
fun QuoteStackScreen() {
    val firebaseService = remember { FirebaseService() }
    val scope = rememberCoroutineScope()
    var quotes by remember { mutableStateOf<List<Quote>>(emptyList()) }
    var currentQuote by remember { mutableStateOf<Quote?>(null) }
    var isLoading by remember { mutableStateOf(true) }
    
    val cardStackState = rememberLazyCardStackState()

    LaunchedEffect(Unit) {
        try {
            val todayQuote = firebaseService.getTodayQuote()
            if (todayQuote != null) {
                val quote = firebaseService.getQuoteById(todayQuote.quoteId)
                if (quote != null) {
                    currentQuote = quote
                    quotes = listOf(quote)
                }
            }
        } catch (e: Exception) {
            // Handle error
        } finally {
            isLoading = false
        }
    }

    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        if (isLoading) {
            CircularProgressIndicator()
        } else if (quotes.isNotEmpty()) {
            LazyCardStack(
                items = quotes,
                state = cardStackState,
                modifier = Modifier.fillMaxSize(),
                onSwipeLeft = { quote ->
                    scope.launch {
                        // Load next quote
                    }
                },
                onSwipeRight = { quote ->
                    scope.launch {
                        // Load previous quote
                    }
                },
                onSwipeUp = { quote ->
                    scope.launch {
                        firebaseService.addToHidden(quote)
                    }
                },
                onSwipeDown = { quote ->
                    scope.launch {
                        firebaseService.addToFavorites(quote)
                    }
                }
            ) { quote ->
                QuoteCard(quote = quote)
            }
        } else {
            Text("No quotes available")
        }
    }
} 