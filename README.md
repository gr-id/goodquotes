# DailyQuoteBot

An Android app that delivers daily inspirational quotes with Firebase integration, push notifications, and a beautiful card-based UI.

## Features

- 📱 **Card Stack UI**: Swipe through quotes with LazyCardStack
- 🔥 **Firebase Integration**: Firestore, Auth, Messaging, Analytics, Functions
- 📅 **Daily Quotes**: Automatic quote updates via Cloud Functions
- 🔔 **Push Notifications**: Daily quote notifications at 11 PM
- 💾 **User Data**: Favorites and hidden quotes per user
- 🌐 **Offline Support**: Fallback to cached quotes when offline
- 📤 **Share Feature**: Share quotes via text

## Project Structure

```
DailyQuoteBot/
├── app/
│   ├── src/main/
│   │   ├── java/com/fabian/dailyquote/
│   │   │   ├── data/           # Data models and Firebase service
│   │   │   ├── service/        # FCM service
│   │   │   ├── ui/            # Compose UI components
│   │   │   └── MainActivity.kt
│   │   └── res/               # Resources
├── functions/                 # Cloud Functions
├── firestore.rules           # Firestore security rules
└── firebase.json            # Firebase configuration
```

## Setup Instructions

### 1. Firebase Project Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication (Anonymous auth)
4. Enable Cloud Messaging
5. Download `google-services.json` and place it in `app/` directory

### 2. Firestore Schema

The app uses the following Firestore collections:

- `quotes/{id}` - Quote documents with fields:
  - `text` (string)
  - `author` (string)
  - `ko` (string) - Korean translation
  - `tags` (array)
  - `createdAt` (timestamp)

- `meta/todayQuote` - Today's quote metadata:
  - `quoteId` (string)
  - `updatedAt` (timestamp)

- `users/{uid}/favorites` - User's favorite quotes
- `users/{uid}/hidden` - User's hidden quotes
- `users/{uid}/tokens` - FCM tokens

### 3. Cloud Functions Deployment

```bash
cd functions
npm install
firebase deploy --only functions
```

### 4. Initial Data Import

1. Download quotes from quotable.io:
```bash
curl "https://api.quotable.io/quotes?limit=500" > quotes.json
```

2. Convert to Firestore format and import:
```bash
# Convert to newline-delimited JSON
# Add ko="" field to each quote
gcloud firestore import gs://YOUR_BUCKET/q_init
```

### 5. Android App Setup

1. Build the project:
```bash
./gradlew assembleDebug
```

2. Run on device/emulator:
```bash
./gradlew installDebug
```

## Usage

### Swipe Gestures

- **Swipe Left**: Skip to next quote
- **Swipe Right**: Go to previous quote  
- **Swipe Up**: Hide quote (adds to hidden collection)
- **Swipe Down**: Save to favorites

### Push Notifications

- App automatically registers for FCM tokens on first launch
- Daily quotes are sent at 11 PM via Cloud Functions
- Users can opt-out by disabling notifications

## Development

### Testing

```bash
# Start Firebase emulators
firebase emulators:start

# Run tests
./gradlew test
```

### Building for Release

```bash
./gradlew assembleRelease
```

## Dependencies

- **Android**: minSdk 24, targetSdk 34
- **Kotlin**: 1.9.10
- **Jetpack Compose**: Latest stable
- **Firebase BOM**: 33.1.0
- **LazyCardStack**: 1.1.2

## License

This project is licensed under the MIT License. 