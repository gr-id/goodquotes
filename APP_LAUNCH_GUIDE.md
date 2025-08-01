# 📱 DailyQuoteBot 앱 구동 가이드

## 🚀 **1단계: Android Studio 설정**

### **Android Studio 설치**
1. [Android Studio 다운로드](https://developer.android.com/studio)
2. 설치 후 실행
3. **"Open an existing project"** 선택
4. `D:\cursor project\goodquotes` 폴더 선택

### **프로젝트 열기**
```
File → Open → D:\cursor project\goodquotes → OK
```

## 🔧 **2단계: Gradle 동기화**

### **자동 동기화 대기**
- Android Studio가 자동으로 Gradle 동기화를 시작
- 하단 상태바에서 진행 상황 확인
- 완료될 때까지 대기 (5-10분 소요)

### **수동 동기화 (필요시)**
```
File → Sync Project with Gradle Files
또는
Tools → Android → Sync Project with Gradle Files
```

## 📱 **3단계: 디바이스 설정**

### **옵션 1: Android 에뮬레이터 사용**
1. **AVD Manager 열기**
   ```
   Tools → AVD Manager
   ```

2. **새 에뮬레이터 생성**
   - **Create Virtual Device** 클릭
   - **Phone** → **Pixel 4** 선택
   - **API Level 34** (Android 14) 선택
   - **Next** → **Finish**

3. **에뮬레이터 실행**
   - AVD Manager에서 생성된 에뮬레이터 **▶️** 클릭
   - 에뮬레이터 부팅 완료까지 대기

### **옵션 2: 실제 Android 디바이스 사용**
1. **개발자 옵션 활성화**
   - 설정 → 휴대전화 정보 → 빌드 번호 7번 탭

2. **USB 디버깅 활성화**
   - 설정 → 개발자 옵션 → USB 디버깅 ON

3. **USB 연결**
   - USB 케이블로 컴퓨터 연결
   - "USB 디버깅 허용" 팝업에서 **확인**

## 🏃‍♂️ **4단계: 앱 실행**

### **실행 버튼 클릭**
```
Run → Run 'app'
또는
Shift + F10
```

### **디바이스 선택**
- 실행 가능한 디바이스 목록에서 선택
- 에뮬레이터 또는 실제 디바이스 선택

## 📋 **5단계: 앱 기능 테스트**

### **기본 기능 확인**
1. **오늘의 명언 표시**
   - 메인 화면에 명언과 작가명 표시
   - "Everyone wants to go to Heaven, but no one wants to die." - Robert Kiyosaki

2. **스와이프 기능**
   - **왼쪽 스와이프**: 다음 명언
   - **오른쪽 스와이프**: 이전 명언
   - **위쪽 스와이프**: 숨기기
   - **아래쪽 스와이프**: 즐겨찾기

3. **푸시 알림**
   - 앱 첫 실행 시 알림 권한 요청
   - 매일 오후 11시 푸시 알림 수신

## 🔍 **6단계: 문제 해결**

### **일반적인 문제들**

#### **1. Gradle 동기화 실패**
```
Error: Could not resolve dependencies
```
**해결방법:**
- 인터넷 연결 확인
- File → Invalidate Caches and Restart
- Gradle 캐시 삭제 후 재시도

#### **2. 빌드 오류**
```
Error: google-services.json not found
```
**해결방법:**
- `app/google-services.json` 파일이 있는지 확인
- Firebase Console에서 다운로드 필요

#### **3. 에뮬레이터 문제**
```
Error: Emulator not responding
```
**해결방법:**
- AVD Manager에서 에뮬레이터 삭제 후 재생성
- BIOS에서 가상화 기술 활성화

#### **4. 실제 디바이스 연결 문제**
```
Error: Device not found
```
**해결방법:**
- USB 케이블 교체
- 다른 USB 포트 시도
- 디바이스 드라이버 재설치

## 📊 **7단계: 성능 확인**

### **앱 성능 지표**
- **시작 시간**: 3-5초
- **명언 로딩**: 1-2초
- **스와이프 반응**: 즉시
- **메모리 사용량**: 50-100MB

### **네트워크 연결**
- **Firebase 연결**: 자동
- **명언 데이터**: 실시간 로딩
- **오프라인 지원**: 기본 명언 캐시

## 🎯 **8단계: 추가 테스트**

### **고급 기능 테스트**
1. **즐겨찾기 기능**
   - 아래쪽 스와이프로 명언 저장
   - Firebase Console에서 확인

2. **숨기기 기능**
   - 위쪽 스와이프로 명언 숨기기
   - 다시 나타나지 않음

3. **공유 기능**
   - 명언 텍스트 복사
   - 다른 앱으로 공유

## 📱 **앱 스크린샷 예상**

```
┌─────────────────────────┐
│     DailyQuoteBot       │
├─────────────────────────┤
│                         │
│  "Everyone wants to go  │
│  to Heaven, but no one  │
│  wants to die."         │
│                         │
│  — Robert Kiyosaki      │
│                         │
│  [한국어 번역]           │
│                         │
├─────────────────────────┤
│  [스와이프 가이드]      │
└─────────────────────────┘
```

## 🚀 **성공 시 확인사항**

✅ **Android Studio에서 프로젝트 열기 성공**  
✅ **Gradle 동기화 완료**  
✅ **에뮬레이터/디바이스 연결**  
✅ **앱 빌드 및 실행 성공**  
✅ **오늘의 명언 표시**  
✅ **스와이프 기능 작동**  
✅ **Firebase 연결 확인**  

**🎉 이제 DailyQuoteBot 앱이 완전히 구동됩니다!** 