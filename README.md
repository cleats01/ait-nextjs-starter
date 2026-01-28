# AIT Next.js Starter

앱인토스 미니앱을 빠르게 개발하기 위한 Next.js 보일러플레이트입니다.

## 🚀 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 배포
pnpm deploy
```

## 📦 포함된 라이브러리

### 상태 관리

- **Zustand** - 클라이언트 상태 관리
- **TanStack Query** - 서버 상태 관리

### 폼 관리

- **react-hook-form** - 폼 상태 관리
- **zod** - 스키마 검증
- **@hookform/resolvers** - react-hook-form과 zod 연동

### UI/스타일링

- **@toss/tds-mobile-ait** - TDS 모바일 컴포넌트
- **@emotion/react** - CSS-in-JS
- **Tailwind CSS** - 유틸리티 CSS

### 유틸리티

- **date-fns** - 날짜 처리

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # 인증 필요 페이지
│   ├── (auth)/            # 인증 관련 페이지
│   ├── providers/         # React Providers
│   ├── error.tsx          # 에러 페이지
│   ├── global-error.tsx   # 글로벌 에러 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/             # 공용 컴포넌트
│   └── ui/                # UI 컴포넌트 (Loading, ErrorDisplay 등)
├── lib/                    # 공용 라이브러리
│   ├── api/               # API 클라이언트 및 타입 헬퍼
│   ├── constants/         # 앱 상수
│   ├── hooks/             # 커스텀 훅
│   ├── stores/            # Zustand 스토어
│   ├── utils/             # 유틸리티 함수
│   ├── date.ts            # 날짜 유틸리티
│   ├── env.ts             # 환경 변수
│   └── query-client.ts    # TanStack Query 설정
└── types/                  # 타입 정의
    ├── api.ts             # API 타입
    └── index.ts           # 공용 타입
```

## 🔧 주요 기능

- ✅ TanStack Query 설정 및 예제
- ✅ Zustand 스토어 예제
- ✅ API 클라이언트 기본 구조 및 타입 헬퍼
- ✅ 환경 변수 타입 안전성 (zod)
- ✅ 날짜 유틸리티 (한국어 지원)
- ✅ TDS Mobile AIT 통합
- ✅ 에러 바운더리 (error.tsx, global-error.tsx)
- ✅ 기본 UI 컴포넌트 (Loading, ErrorDisplay)
- ✅ 유틸리티 함수 (cn, validation 등)
- ✅ 타입 정의 기본 구조
- ✅ 상수 관리
- ✅ ESLint + Prettier 설정 (Tailwind CSS 자동 정렬)

## 📝 다음 단계

1. 환경 변수 설정
   - `.env.example` 파일을 참고하여 `.env.local` 파일 생성
   - 필요한 환경 변수 값 입력
2. API 엔드포인트 설정
   - `src/lib/api/client.ts`에서 baseURL 설정
   - `src/lib/constants/index.ts`에 API 엔드포인트 추가
3. 타입 정의
   - `src/types/api.ts`에 실제 API 타입 정의
4. 인증 로직 구현
   - `@apps-in-toss/web-framework`의 인증 유틸리티 활용
5. 필요한 컴포넌트 추가
   - `src/components/ui/`에 추가 UI 컴포넌트 생성

## 📜 License

MIT License
