# 📱 Android 에뮬레이터 문제 해결 가이드

## 🚨 **일반적인 에뮬레이터 문제들**

### **1. 에뮬레이터가 시작되지 않음**
- **증상**: 에뮬레이터 실행 버튼을 눌러도 반응 없음
- **원인**: 가상화 기술 비활성화, 메모리 부족, 드라이버 문제

### **2. 에뮬레이터가 느리거나 멈춤**
- **증상**: 에뮬레이터가 매우 느리게 실행되거나 멈춤
- **원인**: RAM 부족, CPU 가상화 문제, 그래픽 드라이버 문제

### **3. 에뮬레이터가 검은 화면**
- **증상**: 에뮬레이터가 실행되지만 검은 화면만 표시
- **원인**: 그래픽 드라이버 문제, 하드웨어 가속 문제

## 🛠️ **해결 방법**

### **방법 1: BIOS에서 가상화 기술 활성화**

1. **컴퓨터 재시작 후 BIOS 진입**
   - F2, F10, Del 키 중 하나를 반복 누르기
   - 제조사별로 다름

2. **가상화 기술 찾기**
   - **Intel**: Virtualization Technology (VT-x)
   - **AMD**: AMD-V, SVM Mode
   - **BIOS 설정** → **Advanced** → **CPU Configuration**

3. **활성화**
   - 가상화 기술을 **Enabled**로 설정
   - 저장 후 재부팅

### **방법 2: Windows 기능 활성화**

1. **Windows 기능 열기**
   ```
   제어판 → 프로그램 → Windows 기능 켜기/끄기
   ```

2. **필요한 기능 활성화**
   - ✅ **Hyper-V** (Windows 10 Pro/Enterprise)
   - ✅ **Windows Hypervisor Platform**
   - ✅ **Virtual Machine Platform**

3. **재부팅**
   - 변경사항 적용을 위해 재부팅

### **방법 3: Android Studio 설정 확인**

1. **AVD Manager 열기**
   ```
   Tools → AVD Manager
   ```

2. **새 에뮬레이터 생성**
   - **Create Virtual Device** 클릭
   - **Phone** → **Pixel 4** 선택
   - **API Level 34** (Android 14) 선택
   - **Next** → **Finish**

3. **고급 설정**
   - **Show Advanced Settings** 클릭
   - **Graphics**: Hardware - GLES 2.0
   - **RAM**: 2048 MB
   - **VM Heap**: 256 MB
   - **Internal Storage**: 2048 MB

### **방법 4: 그래픽 드라이버 업데이트**

1. **드라이버 확인**
   ```
   장치 관리자 → 디스플레이 어댑터
   ```

2. **드라이버 업데이트**
   - 제조사 웹사이트에서 최신 드라이버 다운로드
   - NVIDIA, AMD, Intel 그래픽 드라이버

### **방법 5: 메모리 및 성능 최적화**

1. **불필요한 프로그램 종료**
   - 백그라운드 프로그램 정리
   - 메모리 확보

2. **에뮬레이터 설정 최적화**
   - **RAM**: 1536 MB (최소)
   - **Graphics**: Software (성능 문제 시)

## 📱 **Android Studio에서 에뮬레이터 생성**

### **1단계: AVD Manager 열기**
```
Tools → AVD Manager
```

### **2단계: 새 에뮬레이터 생성**
1. **Create Virtual Device** 클릭
2. **Phone** 카테고리 선택
3. **Pixel 4** 또는 **Pixel 6** 선택
4. **Next** 클릭

### **3단계: 시스템 이미지 선택**
1. **API Level 34** (Android 14) 선택
2. **Download** 클릭 (처음 사용 시)
3. **Next** 클릭

### **4단계: 고급 설정**
1. **Show Advanced Settings** 클릭
2. **Graphics**: Hardware - GLES 2.0
3. **RAM**: 2048 MB
4. **Internal Storage**: 2048 MB
5. **Finish** 클릭

## 🔧 **고급 문제 해결**

### **에뮬레이터 로그 확인**
```
Android Studio → View → Tool Windows → Logcat
```

### **명령줄에서 에뮬레이터 실행**
```bash
# 에뮬레이터 목록 확인
emulator -list-avds

# 특정 에뮬레이터 실행
emulator -avd [에뮬레이터_이름] -gpu host
```

### **에뮬레이터 재설정**
1. **AVD Manager**에서 에뮬레이터 선택
2. **Wipe Data** 클릭
3. **Cold Boot Now** 클릭

## ⚡ **성능 최적화 팁**

### **1. 하드웨어 가속 사용**
- **Graphics**: Hardware - GLES 2.0
- **GPU 가속**: 활성화

### **2. 메모리 설정**
- **RAM**: 2048 MB 이상
- **VM Heap**: 256 MB
- **Internal Storage**: 2048 MB

### **3. 시스템 최적화**
- **불필요한 서비스 비활성화**
- **디스크 정리**
- **메모리 확보**

## 🚀 **대안 방법**

### **1. 실제 Android 디바이스 사용**
1. **개발자 옵션 활성화**
   - 설정 → 휴대전화 정보 → 빌드 번호 7번 탭

2. **USB 디버깅 활성화**
   - 설정 → 개발자 옵션 → USB 디버깅 ON

3. **USB 연결**
   - USB 케이블로 컴퓨터 연결
   - "USB 디버깅 허용" 팝업에서 확인

### **2. 다른 에뮬레이터 사용**
- **Genymotion**: 더 빠른 성능
- **BlueStacks**: 게임용 에뮬레이터
- **NoxPlayer**: 안정적인 성능

## ✅ **성공 확인**

에뮬레이터가 정상 작동하면:
- ✅ **부팅 완료** (Android 로고 표시)
- ✅ **홈 화면 표시**
- ✅ **터치 반응 정상**
- ✅ **앱 설치 및 실행 가능**

## 📞 **추가 도움**

문제가 지속되면:
1. **Android Studio 재설치**
2. **SDK Manager에서 시스템 이미지 재다운로드**
3. **다른 API 레벨 시도** (API 33, 32)
4. **실제 디바이스 사용 고려**

**🎯 실제 Android 디바이스 사용이 가장 안정적입니다!** 