# API Routes

Next.js App Router의 API Routes 예시입니다.

## 구조

```
src/app/api/
├── example/
│   └── route.ts    # GET, POST 예제
├── health/
│   └── route.ts    # 헬스 체크
└── README.md       # 이 파일
```

## 사용 방법

### 1. 새로운 API Route 생성

`src/app/api/[endpoint]/route.ts` 파일을 생성하고 HTTP 메서드를 export합니다.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export async function GET(request: NextRequest) {
  // GET 로직
}

export async function POST(request: NextRequest) {
  // POST 로직
}
```

### 2. 클라이언트에서 호출

```typescript
import { apiClient } from '@/lib';

// GET 요청
const response = await apiClient.get<ApiResponse<Data>>('/api/example');

// POST 요청
const response = await apiClient.post<ApiResponse<Data>>('/api/example', {
  name: 'John',
});
```

## 참고

- Next.js App Router는 `route.ts` 파일을 사용합니다 (이전의 `pages/api`와 다름)
- 각 HTTP 메서드(GET, POST, PUT, DELETE 등)를 함수로 export합니다
- `NextRequest`와 `NextResponse`를 사용하여 요청/응답을 처리합니다
- 타입 안전성을 위해 `ApiResponse` 타입을 사용합니다
