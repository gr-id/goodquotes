# ⚡ 즉시 해결: Hypervisor Driver 문제

## 🚨 **문제 진단 결과**
```
VirtualizationFirmwareEnabled: FALSE
```
**가상화가 BIOS에서 비활성화되어 있습니다!**

## 🛠️ **즉시 해결 방법**

### **1단계: BIOS에서 가상화 활성화 (필수)**

1. **컴퓨터 재시작**
   - Windows 키 → 전원 → 재시작

2. **BIOS 진입**
   - 재시작 중 **F2, F10, Del** 키 중 하나를 반복 누르기
   - 제조사별로 다름 (보통 화면에 표시됨)

3. **가상화 기술 찾기**
   - **Intel**: Virtualization Technology (VT-x)
   - **BIOS 설정** → **Advanced** → **CPU Configuration**
   - 또는 **Security** → **Virtualization Technology**

4. **활성화**
   - 가상화 기술을 **Enabled**로 설정
   - **Save & Exit** → **Yes**

### **2단계: Windows 가상화 기능 활성화**

**관리자 권한으로 명령프롬프트 실행:**
```cmd
dism.exe /Online /Enable-Feature:Microsoft-Windows-Subsystem-Linux /All
dism.exe /Online /Enable-Feature:VirtualMachinePlatform /All
```

### **3단계: Hypervisor 설정**

```cmd
bcdedit /set hypervisorlaunchtype auto
```

### **4단계: 재부팅**

```cmd
shutdown /r /t 0
```

## 🔍 **확인 방법**

재부팅 후 PowerShell에서 확인:
```powershell
systeminfo | findstr "Hyper-V"
wmic cpu get name,numberofcores,virtualizationfirmwareenabled
```

**정상이면:**
- Hyper-V 요구사항: 예
- VirtualizationFirmwareEnabled: TRUE

## ⚡ **대안 해결책 (즉시 사용 가능)**

### **1. Software 렌더링 사용**
```
Android Studio → Tools → AVD Manager → 에뮬레이터 편집
Show Advanced Settings → Graphics: Software - GLES 2.0
```

### **2. 실제 Android 디바이스 사용 (권장)**
1. **개발자 옵션 활성화**
   - 설정 → 휴대전화 정보 → 빌드 번호 7번 탭

2. **USB 디버깅 활성화**
   - 설정 → 개발자 옵션 → USB 디버깅 ON

3. **USB 연결**
   - USB 케이블로 컴퓨터 연결
   - "USB 디버깅 허용" 팝업에서 확인

4. **Android Studio에서 디바이스 선택**
   ```
   Run → Run 'app' → 실제 디바이스 선택
   ```

## 🚀 **성능 최적화**

### **에뮬레이터 설정 (Software 렌더링 사용 시)**
```
RAM: 1536 MB
VM Heap: 256 MB
Internal Storage: 1024 MB
Graphics: Software - GLES 2.0
```

## ✅ **성공 확인**

가상화가 활성화되면:
- ✅ **Hypervisor Driver 설치 가능**
- ✅ **하드웨어 가속 사용 가능**
- ✅ **빠른 에뮬레이터 성능**

## 🎯 **권장사항**

**실제 Android 디바이스 사용을 강력히 권장합니다!**

- 🚀 **더 빠른 성능**
- 📱 **실제 사용자 경험**
- 🔧 **문제 해결 용이**
- ⚡ **즉시 사용 가능**

**실제 디바이스가 가장 안정적이고 빠릅니다!** 