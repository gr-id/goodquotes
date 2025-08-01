# 📚 무료 명언 API 소스 가이드

## 🎯 **사용 중인 API 소스들**

### 1. **Quotable** ⭐ (주요 소스)
- **URL**: `https://api.quotable.io/quotes/random?limit=50`
- **라이선스**: MIT (완전 무료, 오픈소스)
- **레이트 리밋**: 180 req/min/IP
- **특징**: 
  - 태그, 저자, 길이 필터 지원
  - 데이터와 API 모두 오픈소스
  - 가장 안정적이고 품질 높은 데이터
- **응답 형식**:
  ```json
  {
    "content": "명언 내용",
    "author": "작가명",
    "tags": ["inspiration", "life"]
  }
  ```

### 2. **ZenQuotes** 🔄 (백업 소스)
- **URL**: `https://zenquotes.io/api/quotes`
- **라이선스**: 무료 (출처 표기 필요)
- **레이트 리밋**: 30초당 5회/IP
- **특징**:
  - 무료 사용 시 링크 표기 의무
  - 키 사용 시 CORS 및 확장 기능 활성화
- **응답 형식**:
  ```json
  {
    "q": "명언 내용",
    "a": "작가명"
  }
  ```

### 3. **QuoteGarden** 🌱 (다양성 확보)
- **URL**: `https://quote-garden.onrender.com/api/v3/quotes/random?count=50`
- **라이선스**: MIT (완전 무료)
- **레이트 리밋**: 100 req/min
- **특징**:
  - V3 엔드포인트 사용
  - 저자, 장르, 검색 지원
  - 공개 호스팅
- **응답 형식**:
  ```json
  {
    "quoteText": "명언 내용",
    "quoteAuthor": "작가명",
    "quoteGenre": "장르"
  }
  ```

### 4. **FavQs** 💎 (QOTD 전용)
- **URL**: `https://favqs.com/api/qotd`
- **라이선스**: 무료 (QOTD만)
- **레이트 리밋**: 20초당 30회
- **특징**:
  - QOTD는 무키 사용 가능
  - 검색, 페이지네이션은 앱 토큰 필요
- **응답 형식**:
  ```json
  {
    "quote": {
      "body": "명언 내용",
      "author": "작가명",
      "tags": ["tag1", "tag2"]
    }
  }
  ```

## 🔄 **API 사용 전략**

### **주간 업데이트** (매주 월요일 자정)
- 모든 API 소스에서 50개씩 명언 수집
- 중복 제거 후 Firestore에 저장
- 랜덤 선택하여 오늘의 명언으로 설정

### **일일 새로고침** (매일 오전 6시)
- 랜덤으로 2개 API 소스 선택
- 새로운 명언으로 오늘의 명언 업데이트

### **오류 처리**
- API 실패 시 다음 소스로 자동 전환
- 타임아웃 설정 (5-8초)
- User-Agent 헤더 포함

## 📊 **API 성능 비교**

| API | 안정성 | 데이터 품질 | 레이트 리밋 | 라이선스 |
|-----|--------|-------------|------------|----------|
| Quotable | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 180/min | MIT |
| ZenQuotes | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 10/min | 무료 |
| QuoteGarden | ⭐⭐⭐ | ⭐⭐⭐⭐ | 100/min | MIT |
| FavQs | ⭐⭐⭐ | ⭐⭐⭐ | 90/min | 무료 |

## 🚀 **테스트 방법**

### **수동 테스트**
```bash
curl "https://us-central1-goodquotes-9e629.cloudfunctions.net/manualQuoteFetch"
```

### **응답 예시**
```json
{
  "success": true,
  "quote": {
    "id": "trGEDMzJXGNEdYkcMh4v",
    "text": "Don't spend time beating on a wall, hoping to transform it into a door.",
    "author": "Coco Chanel",
    "ko": "",
    "tags": [],
    "createdAt": "2025-08-01T00:00:00Z"
  },
  "totalFetched": 150
}
```

## 📈 **모니터링**

### **Cloud Functions 로그**
- Firebase Console → Functions → Logs
- 각 API 소스별 성공/실패 로그 확인
- 레이트 리밋 위반 모니터링

### **성공 지표**
- 주간 업데이트: 100-200개 명언 수집
- 일일 새로고침: 10-50개 명언 수집
- 중복 제거 후 70-80% 유지율

## 🔧 **향후 개선 사항**

1. **API Ninjas 추가** (무료 키 필요)
2. **한국어 번역 자동화** (Google Translate API)
3. **명언 품질 필터링** (길이, 내용 검증)
4. **사용자 피드백 반영** (좋아요/싫어요)

## 📝 **라이선스 준수**

- **Quotable**: MIT 라이선스 준수
- **ZenQuotes**: 출처 표기 준비
- **QuoteGarden**: MIT 라이선스 준수
- **FavQs**: 무료 사용 범위 내 활용 