# 찍지오 (JjikGeo) - 프론트엔드

서울 문화유산 탐방 및 스탬프 수집 앱의 프론트엔드입니다.

## 주요 기능

- 📍 GPS 기반 위치 추적 (칼만 필터 적용)
- 🏛️ 서울 문화유산 정보 제공
- 📷 카메라를 통한 건물 인식
- 🎯 스탬프 수집 시스템
- 🚻 주변 편의시설 안내
- 🌐 다국어 지원 (한국어/영어)

## 기술 스택

- React 18.3.1
- React Router DOM 6.8.0
- AWS Amplify
- Axios

## 설치 및 실행

```bash
npm install
npm start
```

## 환경 변수

```
REACT_APP_API_URL=http://localhost:5003
REACT_APP_BACKEND_URL=http://localhost:5003
```

## 백엔드 연결

백엔드 서버는 `C:\Users\DSO19\Desktop\new\backend`에 위치합니다.

## 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── hooks/         # 커스텀 훅
├── pages/         # 페이지 컴포넌트
├── utils/         # 유틸리티 함수
├── App.js         # 메인 앱 컴포넌트
└── index.js       # 엔트리 포인트
```
