import { ApiResponse, ApiError } from '@/types';

/**
 * API 타입 헬퍼 함수
 */

/**
 * API 응답을 안전하게 파싱
 */
export function parseApiResponse<T>(response: unknown): ApiResponse<T> {
  if (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    'success' in response
  ) {
    return response as ApiResponse<T>;
  }
  throw new Error('Invalid API response format');
}

/**
 * API 에러를 생성
 */
export function createApiError(
  message: string,
  code?: string,
  statusCode?: number
): ApiError {
  return {
    message,
    code,
    statusCode,
  };
}

/**
 * API 응답이 성공인지 확인
 */
export function isApiSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: true } {
  return response.success === true;
}

/**
 * API 응답이 실패인지 확인
 */
export function isApiError(
  response: ApiResponse<unknown>
): response is ApiResponse<unknown> & { success: false } {
  return response.success === false;
}
