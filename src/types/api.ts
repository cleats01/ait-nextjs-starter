/**
 * API 타입 정의 예제
 * 실제 사용 시 이 파일을 참고하여 새로운 타입을 만들거나 삭제하세요.
 */

import { ApiResponse } from './index';

// 예제: 사용자 타입
export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

// 예제: API 응답 타입
export type GetUserResponse = ApiResponse<User>;
export type GetUsersResponse = ApiResponse<User[]>;
