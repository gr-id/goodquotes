# 🔥 오늘의 명언 설정 가이드

## 📋 **추가된 명언들**

다음 명언들이 Firestore에 성공적으로 추가되었습니다:

### 1. **Steve Maraboli**
- **ID**: `9cyzCzxZ1Sl6WTceZfas`
- **명언**: "Happiness is not the absence of problems, it's the ability to deal with them."

### 2. **Meister Eckhart**
- **ID**: `7LONWXQ0CxevJ9qdBZZ0`
- **명언**: "It is in the darkness that one finds the light."

### 3. **Gustave Flaubert**
- **ID**: `nai0WIPgT8OaV7x0WLL1`
- **명언**: "You can calculate the worth of a man by the number of his enemies."

### 4. **Zhuangzi**
- **ID**: `p0kMouheu78fSIOCraB9`
- **명언**: "Cease striving. Then there will be transformation."

### 5. **Soyen Shaku**
- **ID**: `v1zXoaq9TNmxZxjStrF9`
- **명언**: "Have the fearless attitude of a hero and the loving heart of a child."

## 🎯 **오늘의 명언 설정 방법**

### 1. Firebase Console 접속
1. [Firebase Console](https://console.firebase.google.com/project/goodquotes-9e629/firestore) 접속
2. **"Firestore Database"** 클릭
3. **"데이터"** 탭 확인

### 2. meta 컬렉션 생성
1. **"컬렉션 시작"** 클릭
2. **컬렉션 ID**: `meta` 입력
3. **문서 ID**: `todayQuote` 입력

### 3. 오늘의 명언 설정
다음 JSON 데이터를 입력:

```json
{
  "quoteId": "9cyzCzxZ1Sl6WTceZfas",
  "updatedAt": "2025-01-30T00:00:00Z",
  "source": "manual_setup"
}
```

### 4. 필드 추가
- **quoteId**: 위의 명언 ID 중 하나 선택
- **updatedAt**: 현재 시간 (Timestamp)
- **source**: "manual_setup"

## 🔄 **명언 교체 방법**

다른 명언으로 교체하려면:

1. **meta/todayQuote** 문서 편집
2. **quoteId** 필드를 원하는 명언 ID로 변경
3. **updatedAt** 필드를 현재 시간으로 업데이트

## 📱 **앱에서 확인**

설정 후 Android 앱을 실행하면:
- 오늘의 명언이 메인 화면에 표시
- 스와이프로 다른 명언 탐색 가능
- 푸시 알림으로 오늘의 명언 전송

## 🚀 **자동화**

- **매주 월요일 자정**: `weeklyUpdate` 함수가 자동으로 새로운 명언들 추가
- **매일 오전 6시**: `dailyQuoteRefresh` 함수가 오늘의 명언 업데이트
- **매일 오후 11시**: `dailyPush` 함수가 푸시 알림 전송 