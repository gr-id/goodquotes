# 수동 데이터 설정 가이드

## 🔥 Firestore 초기 데이터 추가

### 1. Firebase Console에서 데이터 추가

1. [Firebase Console](https://console.firebase.google.com/project/goodquotes-9e629/firestore) 접속
2. **"Firestore Database"** 클릭
3. **"데이터"** 탭에서 수동으로 데이터 추가

### 2. 컬렉션 및 문서 구조

#### **quotes 컬렉션**
```
quotes/{auto-generated-id}
{
  "text": "명언 내용",
  "author": "작가명",
  "ko": "", // 한국어 번역 (나중에 추가)
  "tags": ["inspiration", "life"],
  "createdAt": Timestamp
}
```

#### **meta 컬렉션**
```
meta/todayQuote
{
  "quoteId": "quotes 컬렉션의 문서 ID",
  "updatedAt": Timestamp
}
```

### 3. 샘플 데이터

#### **첫 번째 명언**
```json
{
  "text": "The only way to do great work is to love what you do.",
  "author": "Steve Jobs",
  "ko": "",
  "tags": ["work", "passion", "success"],
  "createdAt": "2025-08-01T00:00:00Z"
}
```

#### **두 번째 명언**
```json
{
  "text": "Life is what happens when you're busy making other plans.",
  "author": "John Lennon",
  "ko": "",
  "tags": ["life", "plans", "wisdom"],
  "createdAt": "2025-08-01T00:00:00Z"
}
```

#### **세 번째 명언**
```json
{
  "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "author": "Winston Churchill",
  "ko": "",
  "tags": ["success", "failure", "courage"],
  "createdAt": "2025-08-01T00:00:00Z"
}
```

### 4. todayQuote 메타데이터
```json
{
  "quoteId": "첫 번째 명언의 문서 ID",
  "updatedAt": "2025-08-01T00:00:00Z"
}
```

## 🚀 다음 단계

1. **Firebase Console에서 데이터 추가**
2. **Android Studio에서 프로젝트 열기**
3. **앱 빌드 및 테스트**

## 📞 문제 해결

- **데이터 추가 오류**: Firestore 보안 규칙 확인
- **앱 연결 오류**: google-services.json 파일 확인
- **푸시 알림 오류**: FCM 설정 확인 