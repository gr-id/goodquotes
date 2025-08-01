package com.fabian.dailyquote.data

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.messaging.FirebaseMessaging
import kotlinx.coroutines.tasks.await

class FirebaseService {
    private val firestore = FirebaseFirestore.getInstance()
    private val auth = FirebaseAuth.getInstance()
    private val messaging = FirebaseMessaging.getInstance()

    suspend fun getTodayQuote(): TodayQuote? {
        return try {
            val doc = firestore.collection("meta").document("todayQuote").get().await()
            doc.toObject(TodayQuote::class.java)
        } catch (e: Exception) {
            null
        }
    }

    suspend fun getQuoteById(quoteId: String): Quote? {
        return try {
            val doc = firestore.collection("quotes").document(quoteId).get().await()
            doc.toObject(Quote::class.java)?.copy(id = doc.id)
        } catch (e: Exception) {
            null
        }
    }

    suspend fun addToFavorites(quote: Quote) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid)
            .collection("favorites").document(quote.id)
            .set(quote)
    }

    suspend fun addToHidden(quote: Quote) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid)
            .collection("hidden").document(quote.id)
            .set(quote)
    }

    suspend fun saveFCMToken(token: String) {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid)
            .collection("tokens").document("fcm")
            .set(mapOf("token" to token, "updatedAt" to com.google.firebase.Timestamp.now()))
    }

    suspend fun deleteFCMToken() {
        val uid = auth.currentUser?.uid ?: return
        firestore.collection("users").document(uid)
            .collection("tokens").document("fcm")
            .delete()
    }

    suspend fun getFCMToken(): String? {
        return try {
            messaging.token.await()
        } catch (e: Exception) {
            null
        }
    }
} 