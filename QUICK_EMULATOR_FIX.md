# ⚡ 빠른 에뮬레이터 문제 해결

## 🚨 **즉시 시도할 방법들**

### **1. 에뮬레이터 재생성**
```
Tools → AVD Manager → 기존 에뮬레이터 삭제 → Create Virtual Device
```

### **2. 그래픽 설정 변경**
```
AVD Manager → 에뮬레이터 편집 → Show Advanced Settings
Graphics: Software - GLES 2.0 (Hardware 대신)
```

### **3. 메모리 설정 최적화**
```
RAM: 1536 MB (2048 MB 대신)
VM Heap: 256 MB
Internal Storage: 1024 MB
```

### **4. Cold Boot 실행**
```
AVD Manager → 에뮬레이터 선택 → Cold Boot Now
```

## 📱 **실제 Android 디바이스 사용 (권장)**

### **1. 개발자 옵션 활성화**
- 설정 → 휴대전화 정보 → 빌드 번호 7번 탭

### **2. USB 디버깅 활성화**
- 설정 → 개발자 옵션 → USB 디버깅 ON

### **3. USB 연결**
- USB 케이블로 컴퓨터 연결
- "USB 디버깅 허용" 팝업에서 확인

### **4. Android Studio에서 디바이스 선택**
```
Run → Run 'app' → 실제 디바이스 선택
```

## 🔧 **Windows 가상화 확인**

### **PowerShell에서 확인**
```powershell
systeminfo | findstr "Hyper-V"
```

### **가상화 활성화 (관리자 권한)**
```powershell
dism.exe /Online /Enable-Feature:Microsoft-Windows-Subsystem-Linux /All
dism.exe /Online /Enable-Feature:VirtualMachinePlatform /All
```

### **재부팅 후 확인**
```powershell
bcdedit /set hypervisorlaunchtype auto
```

## ⚡ **성능 최적화**

### **1. 불필요한 프로그램 종료**
- 백그라운드 프로그램 정리
- 메모리 확보

### **2. 에뮬레이터 설정**
- **Graphics**: Software (성능 문제 시)
- **RAM**: 1536 MB (최소)
- **Multi-Core CPU**: 2 (CPU 부족 시)

### **3. Android Studio 설정**
```
File → Settings → Appearance & Behavior → System Settings → Memory Settings
IDE max heap size: 2048 MB
```

## 🚀 **대안 에뮬레이터**

### **1. Genymotion (무료 버전)**
- 더 빠른 성능
- [Genymotion 다운로드](https://www.genymotion.com/)

### **2. BlueStacks**
- 게임용 에뮬레이터
- 안정적인 성능

### **3. NoxPlayer**
- 무료 사용 가능
- 안정적인 성능

## ✅ **성공 확인**

에뮬레이터가 정상 작동하면:
- ✅ **Android 로고 표시**
- ✅ **홈 화면 나타남**
- ✅ **터치 반응 정상**
- ✅ **앱 설치 가능**

## 🎯 **권장사항**

**실제 Android 디바이스 사용을 강력히 권장합니다!**

- 🚀 **더 빠른 성능**
- 📱 **실제 사용자 경험**
- 🔧 **문제 해결 용이**
- ⚡ **즉시 사용 가능**

**실제 디바이스가 가장 안정적이고 빠릅니다!** 