/**
 * 공용 타입 정의
 */

// API 응답 기본 타입
export type ApiResponse<T = unknown> = {
  data: T;
  message?: string;
  success: boolean;
};

// API 에러 응답 타입
export type ApiError = {
  message: string;
  code?: string;
  statusCode?: number;
};

// 페이지네이션 타입
export type PaginationParams = {
  page: number;
  limit: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
