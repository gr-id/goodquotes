package com.fabian.dailyquote.ui

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.fabian.dailyquote.ui.screens.QuoteStackScreen

@Composable
fun DailyQuoteBotApp() {
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        QuoteStackScreen()
    }
} 