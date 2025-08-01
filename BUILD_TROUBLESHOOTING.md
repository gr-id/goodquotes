# 🔧 빌드 문제 해결 가이드

## 🚨 **Gradle 빌드 오류 해결**

### **오류 메시지**
```
'org.gradle.api.artifacts.Dependency org.gradle.api.artifacts.dsl.DependencyHandler.module(java.lang.Object)'
BUILD FAILED
```

## 🔍 **문제 진단**

### **1. Gradle Wrapper 문제**
- **증상**: `./gradlew` 명령어가 작동하지 않음
- **원인**: Gradle Wrapper 파일이 없음
- **해결방법**: Android Studio에서 자동으로 처리됨

### **2. 의존성 문제**
- **증상**: LazyCardStack 라이브러리 로드 실패
- **원인**: JitPack 저장소 설정 문제
- **해결방법**: 이미 `settings.gradle.kts`에 설정됨

## 🛠️ **해결 방법**

### **방법 1: Android Studio에서 직접 빌드**

1. **Android Studio 실행**
   ```
   File → Open → D:\cursor project\goodquotes
   ```

2. **Gradle 동기화**
   ```
   File → Sync Project with Gradle Files
   ```

3. **캐시 정리**
   ```
   File → Invalidate Caches and Restart
   ```

4. **프로젝트 정리**
   ```
   Build → Clean Project
   Build → Rebuild Project
   ```

### **방법 2: 수동 Gradle Wrapper 생성**

1. **Gradle 설치**
   - [Gradle 다운로드](https://gradle.org/releases/)
   - 환경 변수 설정

2. **Wrapper 생성**
   ```bash
   gradle wrapper
   ```

3. **빌드 실행**
   ```bash
   ./gradlew clean
   ./gradlew build
   ```

### **방법 3: 의존성 수정**

만약 LazyCardStack 문제가 지속되면:

1. **임시로 제거**
   ```kotlin
   // app/build.gradle.kts에서 주석 처리
   // implementation("com.github.Hukumister:LazyCardStack:1.1.2")
   ```

2. **대체 라이브러리 사용**
   ```kotlin
   // Compose 기본 Card 사용
   implementation("androidx.compose.material3:material3")
   ```

## 📱 **Android Studio 권장 방법**

### **1. 프로젝트 열기**
```
File → Open → D:\cursor project\goodquotes → OK
```

### **2. 자동 동기화 대기**
- Android Studio가 자동으로 Gradle 동기화 시작
- 하단 상태바에서 진행 상황 확인
- 완료될 때까지 대기 (5-10분)

### **3. 오류 발생 시**
```
File → Invalidate Caches and Restart
→ Invalidate and Restart
```

### **4. 빌드 실행**
```
Build → Make Project
또는
Shift + F9
```

## 🔧 **고급 문제 해결**

### **Gradle 버전 문제**
```kotlin
// gradle/wrapper/gradle-wrapper.properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.0-bin.zip
```

### **플러그인 버전 문제**
```kotlin
// build.gradle.kts (top-level)
plugins {
    id("com.android.application") version "8.1.4" apply false
    id("org.jetbrains.kotlin.android") version "1.9.10" apply false
    id("com.google.gms.google-services") version "4.4.3" apply false
}
```

### **의존성 충돌**
```kotlin
// app/build.gradle.kts
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.9.10") {
            because "kotlin-stdlib-jdk7 is now a part of kotlin-stdlib"
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.9.10") {
            because "kotlin-stdlib-jdk8 is now a part of kotlin-stdlib"
        }
    }
}
```

## ✅ **성공 확인**

빌드가 성공하면:
- ✅ **Gradle 동기화 완료**
- ✅ **의존성 다운로드 완료**
- ✅ **컴파일 성공**
- ✅ **APK 생성 준비 완료**

## 🚀 **다음 단계**

빌드 성공 후:
1. **에뮬레이터 생성**
2. **앱 실행**: `Shift + F10`
3. **기능 테스트**

## 📞 **추가 도움**

문제가 지속되면:
1. **Android Studio 로그 확인**
2. **Gradle 로그 확인**
3. **의존성 버전 호환성 검사**
4. **프로젝트 재생성 고려**

**🎯 Android Studio에서 직접 빌드하는 것이 가장 안정적입니다!** 