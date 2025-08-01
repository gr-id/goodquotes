# ⚡ 빠른 시작 가이드

## 🚀 **즉시 실행하기**

### **1. Android Studio 실행**
```
1. Android Studio 실행
2. "Open an existing project" 클릭
3. D:\cursor project\goodquotes 폴더 선택
4. OK 클릭
```

### **2. 대기**
- Gradle 동기화 완료까지 대기 (5-10분)
- 하단 상태바에서 진행 상황 확인

### **3. 에뮬레이터 생성**
```
Tools → AVD Manager → Create Virtual Device
→ Phone → Pixel 4 → API 34 → Finish
```

### **4. 앱 실행**
```
Shift + F10 또는 Run → Run 'app'
→ 에뮬레이터 선택 → OK
```

## 📱 **예상 결과**

### **메인 화면**
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
│  [한국어 번역 영역]      │
│                         │
├─────────────────────────┤
│  ← 이전  다음 →         │
│  ↑ 숨기기 ↓ 즐겨찾기    │
└─────────────────────────┘
```

### **스와이프 제스처**
- **← 왼쪽**: 다음 명언
- **→ 오른쪽**: 이전 명언  
- **↑ 위쪽**: 명언 숨기기
- **↓ 아래쪽**: 즐겨찾기 추가

## ⚠️ **문제 발생 시**

### **Gradle 오류**
```
File → Invalidate Caches and Restart
```

### **에뮬레이터 오류**
```
AVD Manager → 에뮬레이터 삭제 → 재생성
```

### **빌드 오류**
```
Build → Clean Project → Rebuild Project
```

## 🎯 **성공 확인**

✅ **앱이 실행되고 명언이 표시됨**  
✅ **스와이프로 다른 명언으로 이동 가능**  
✅ **Firebase 연결 확인됨**  

**🎉 성공! DailyQuoteBot이 정상 작동합니다!** 