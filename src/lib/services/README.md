# Service 레이어

API 호출 로직을 캡슐화하는 Service 레이어입니다.

## 구조

```
src/lib/services/
├── example.service.ts    # 예제 Service
└── index.ts              # Export 파일
```

## 사용 방법

### 1. Service 함수 작성

```typescript
// src/lib/services/user.service.ts
import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../constants';
import { ApiResponse } from '@/types';

export type User = {
  id: string;
  name: string;
  email: string;
};

export async function getUser(id: string): Promise<User> {
  const response = await apiClient.get<ApiResponse<User>>(
    `${API_ENDPOINTS.USERS}/${id}`
  );
  return response.data;
}

export async function createUser(data: CreateUserRequest): Promise<User> {
  const response = await apiClient.post<ApiResponse<User>>(
    API_ENDPOINTS.USERS,
    data
  );
  return response.data;
}
```

### 2. React Query 훅에서 사용

```typescript
// src/lib/hooks/use-user-query.ts
import { useQuery } from '@tanstack/react-query';
import { getUser, type User } from '../services/user.service';

export function useUserQuery(id: string) {
  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
}
```

### 3. 컴포넌트에서 사용

```typescript
'use client';

import { useUserQuery } from '@/lib/hooks/use-user-query';

export function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useUserQuery(userId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.name}</div>;
}
```

## 장점

- **관심사 분리**: API 호출 로직과 UI 로직 분리
- **재사용성**: 여러 컴포넌트에서 동일한 Service 함수 사용
- **테스트 용이**: Service 함수를 독립적으로 테스트 가능
- **타입 안전성**: TypeScript로 타입 보장
