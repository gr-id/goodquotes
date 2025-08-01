# Firebase 설정 가이드 - DailyQuoteBot

## 🔥 Firebase 프로젝트 설정

### 1. Firebase Console에서 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. **"프로젝트 만들기"** 클릭
3. 프로젝트 이름: `dailyquotebot`
4. Google Analytics 활성화 (선택사항)
5. **"프로젝트 만들기"** 클릭

### 2. Android 앱 등록

1. 프로젝트 대시보드에서 **"Android"** 아이콘 클릭
2. Android 패키지 이름: `com.fabian.dailyquote`
3. 앱 닉네임: `DailyQuoteBot`
4. **"앱 등록"** 클릭
5. `google-services.json` 파일 다운로드
6. `app/` 디렉토리에 파일 배치

### 3. Firebase 서비스 활성화

#### Firestore Database
1. 왼쪽 메뉴에서 **"Firestore Database"** 클릭
2. **"데이터베이스 만들기"** 클릭
3. 보안 규칙: **"테스트 모드에서 시작"** 선택
4. 위치: `asia-northeast3 (서울)` 선택
5. **"완료"** 클릭

#### Authentication
1. 왼쪽 메뉴에서 **"Authentication"** 클릭
2. **"시작하기"** 클릭
3. **"로그인 방법"** 탭에서 **"익명"** 활성화
4. **"저장"** 클릭

#### Cloud Messaging
1. 왼쪽 메뉴에서 **"Cloud Messaging"** 클릭
2. **"시작하기"** 클릭
3. 서버 키 확인 (Cloud Functions에서 사용)

#### Cloud Functions
1. 왼쪽 메뉴에서 **"Functions"** 클릭
2. **"시작하기"** 클릭
3. 요금제 선택: **"Blaze"** (종량제)
4. 위치: `asia-northeast3 (서울)` 선택

### 4. Firestore 보안 규칙 설정

1. Firestore Database에서 **"규칙"** 탭 클릭
2. 다음 규칙으로 교체:

```javascript
service cloud.firestore {
  match /databases/{db}/documents {
    match /quotes/{id} { 
      allow read: if true; 
      allow write: if false; 
    }
    match /meta/{doc} { 
      allow read: if true; 
      allow write: if false; 
    }
    match /users/{uid}/{any=**} { 
      allow read,write: if request.auth.uid==uid; 
    }
  }
}
```

3. **"게시"** 클릭

### 5. Cloud Functions 배포

```bash
# Firebase CLI 설치 (아직 설치하지 않은 경우)
npm install -g firebase-tools

# Firebase 로그인
firebase login

# 프로젝트 초기화
firebase init functions

# Cloud Functions 배포
cd functions
npm install
firebase deploy --only functions
```

### 6. 초기 데이터 로드

```bash
# Python 스크립트 실행
python scripts/download_quotes.py

# 또는 수동으로 데이터 추가
# Firestore Console에서 직접 데이터 추가
```

## 🔧 환경 설정 확인

### 필수 도구
- [ ] Node.js 20+ 설치
- [ ] Python 3.7+ 설치
- [ ] Firebase CLI 설치
- [ ] Android Studio 설치

### 설정 완료 체크리스트
- [ ] Firebase 프로젝트 생성
- [ ] Android 앱 등록
- [ ] google-services.json 다운로드
- [ ] Firestore Database 활성화
- [ ] Authentication 활성화
- [ ] Cloud Messaging 활성화
- [ ] Cloud Functions 활성화
- [ ] 보안 규칙 설정
- [ ] Cloud Functions 배포
- [ ] 초기 데이터 로드

## 🚨 주의사항

1. **Blaze 요금제**: Cloud Functions 사용을 위해 Blaze 요금제가 필요합니다
2. **위치 설정**: 한국에서 사용하는 경우 `asia-northeast3 (서울)` 선택
3. **보안**: 프로덕션 환경에서는 보안 규칙을 더 엄격하게 설정해야 합니다
4. **API 키**: google-services.json 파일은 절대 공개 저장소에 커밋하지 마세요

## 📞 문제 해결

### 일반적인 문제들
1. **Cloud Functions 배포 실패**: Blaze 요금제 확인
2. **Firestore 접근 오류**: 보안 규칙 확인
3. **FCM 토큰 오류**: google-services.json 파일 확인
4. **빌드 오류**: Gradle 캐시 클리어: `./gradlew clean`

### 지원
- [Firebase 문서](https://firebase.google.com/docs)
- [Android 개발자 문서](https://developer.android.com/)
- [GitHub Issues](https://github.com/gr-id/goodquotes/issues) 