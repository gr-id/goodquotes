package com.fabian.dailyquote.data

import com.google.firebase.Timestamp

data class Quote(
    val id: String = "",
    val text: String = "",
    val author: String = "",
    val ko: String = "",
    val tags: List<String> = emptyList(),
    val createdAt: Timestamp? = null
) 