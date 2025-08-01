# 🔧 Android Emulator Hypervisor Driver 설치 문제 해결

## 🚨 **문제 상황**
```
Android Emulator hypervisor driver is not installed.
Install Android Emulator hypervisor driver for better emulation performance
```

**증상**: 명령프롬프트가 잠깐 실행되고 설치 없이 종료됨

## 🛠️ **해결 방법**

### **방법 1: 수동으로 Hypervisor Driver 설치**

1. **Android Studio SDK 위치 확인**
   ```
   File → Settings → Appearance & Behavior → System Settings → Android SDK
   Android SDK Location: C:\Users\[사용자명]\AppData\Local\Android\Sdk
   ```

2. **명령프롬프트를 관리자 권한으로 실행**
   - Windows 키 + R → `cmd` → Ctrl + Shift + Enter

3. **SDK 위치로 이동**
   ```cmd
   cd C:\Users\[사용자명]\AppData\Local\Android\Sdk\emulator
   ```

4. **Hypervisor Driver 수동 설치**
   ```cmd
   emulator-check.exe accel
   ```

5. **Intel HAXM 설치**
   ```cmd
   cd C:\Users\[사용자명]\AppData\Local\Android\Sdk\extras\intel\Hardware_Accelerated_Execution_Manager
   silent_install.sh
   ```

### **방법 2: Windows 가상화 기능 활성화**

1. **Windows 기능 활성화 (관리자 권한)**
   ```cmd
   dism.exe /Online /Enable-Feature:Microsoft-Windows-Subsystem-Linux /All
   dism.exe /Online /Enable-Feature:VirtualMachinePlatform /All
   ```

2. **Hyper-V 활성화 (Windows 10 Pro/Enterprise)**
   ```cmd
   dism.exe /Online /Enable-Feature:Microsoft-Hyper-V /All
   ```

3. **재부팅**
   ```cmd
   shutdown /r /t 0
   ```

4. **Hypervisor 설정**
   ```cmd
   bcdedit /set hypervisorlaunchtype auto
   ```

### **방법 3: BIOS에서 가상화 기술 활성화**

1. **컴퓨터 재시작 후 BIOS 진입**
   - F2, F10, Del 키 중 하나를 반복 누르기

2. **가상화 기술 찾기**
   - **Intel**: Virtualization Technology (VT-x)
   - **AMD**: AMD-V, SVM Mode
   - **BIOS 설정** → **Advanced** → **CPU Configuration**

3. **활성화**
   - 가상화 기술을 **Enabled**로 설정
   - 저장 후 재부팅

### **방법 4: Intel HAXM 수동 설치**

1. **Intel HAXM 다운로드**
   - [Intel HAXM 다운로드](https://github.com/intel/haxm/releases)
   - 최신 버전 다운로드

2. **관리자 권한으로 설치**
   ```cmd
   haxm-windows_v7_8_0.exe /S
   ```

3. **설치 확인**
   ```cmd
   sc query intelhaxm
   ```

### **방법 5: Android Studio에서 수동 설치**

1. **SDK Manager 열기**
   ```
   Tools → SDK Manager
   ```

2. **SDK Tools 탭 선택**
   - **Intel x86 Emulator Accelerator (HAXM installer)** 체크
   - **Apply** 클릭

3. **설치 후 확인**
   ```
   Tools → AVD Manager → 에뮬레이터 편집 → Show Advanced Settings
   Graphics: Hardware - GLES 2.0
   ```

## 🔍 **문제 진단**

### **1. 가상화 지원 확인**
```cmd
systeminfo | findstr "Hyper-V"
```

### **2. Intel VT-x 확인**
```cmd
wmic cpu get name,numberofcores,virtualizationfirmwareenabled
```

### **3. HAXM 상태 확인**
```cmd
sc query intelhaxm
```

### **4. 에뮬레이터 가속 확인**
```cmd
C:\Users\[사용자명]\AppData\Local\Android\Sdk\emulator\emulator-check.exe accel
```

## ⚡ **대안 해결책**

### **1. Software 렌더링 사용**
```
AVD Manager → 에뮬레이터 편집 → Show Advanced Settings
Graphics: Software - GLES 2.0
```

### **2. 다른 에뮬레이터 사용**
- **Genymotion**: 더 빠른 성능
- **BlueStacks**: 안정적인 성능
- **NoxPlayer**: 무료 사용 가능

### **3. 실제 Android 디바이스 사용 (권장)**
1. **개발자 옵션 활성화**
   - 설정 → 휴대전화 정보 → 빌드 번호 7번 탭

2. **USB 디버깅 활성화**
   - 설정 → 개발자 옵션 → USB 디버깅 ON

3. **USB 연결**
   - USB 케이블로 컴퓨터 연결
   - "USB 디버깅 허용" 팝업에서 확인

## 🚀 **성능 최적화**

### **1. 에뮬레이터 설정 최적화**
```
RAM: 1536 MB
VM Heap: 256 MB
Internal Storage: 1024 MB
Graphics: Software (성능 문제 시)
```

### **2. 시스템 최적화**
- **불필요한 프로그램 종료**
- **메모리 확보**
- **디스크 정리**

### **3. Android Studio 설정**
```
File → Settings → Appearance & Behavior → System Settings → Memory Settings
IDE max heap size: 2048 MB
```

## ✅ **성공 확인**

Hypervisor Driver가 정상 설치되면:
- ✅ **에뮬레이터 가속 활성화**
- ✅ **빠른 부팅 시간**
- ✅ **부드러운 그래픽 성능**
- ✅ **하드웨어 가속 사용 가능**

## 🎯 **권장사항**

**실제 Android 디바이스 사용을 강력히 권장합니다!**

- 🚀 **더 빠른 성능**
- 📱 **실제 사용자 경험**
- 🔧 **문제 해결 용이**
- ⚡ **즉시 사용 가능**

**실제 디바이스가 가장 안정적이고 빠릅니다!** 