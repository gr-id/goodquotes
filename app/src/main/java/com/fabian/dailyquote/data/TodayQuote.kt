package com.fabian.dailyquote.data

import com.google.firebase.Timestamp

data class TodayQuote(
    val quoteId: String = "",
    val updatedAt: Timestamp? = null
) 