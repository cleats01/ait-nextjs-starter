import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../constants';
import { ApiResponse } from '@/types';

/**
 * 예제 Service
 * API 호출 로직을 캡슐화합니다.
 * 실제 사용 시 이 파일을 참고하여 새로운 service를 만들거나 삭제하세요.
 */

export type ExampleData = {
  id: string;
  name: string;
  message?: string;
  timestamp?: string;
};

export type CreateExampleRequest = {
  name: string;
  message?: string;
};

/**
 * 예제 데이터 조회
 */
export async function getExample(name?: string): Promise<ExampleData> {
  const params = name ? `?name=${encodeURIComponent(name)}` : '';
  const response = await apiClient.get<ApiResponse<ExampleData>>(
    `${API_ENDPOINTS.EXAMPLE}${params}`
  );
  return response.data;
}

/**
 * 예제 데이터 생성
 */
export async function createExample(
  data: CreateExampleRequest
): Promise<ExampleData> {
  const response = await apiClient.post<ApiResponse<ExampleData>>(
    API_ENDPOINTS.EXAMPLE,
    data
  );
  return response.data;
}

/**
 * 예제 데이터 수정
 */
export async function updateExample(
  id: string,
  data: Partial<CreateExampleRequest>
): Promise<ExampleData> {
  const response = await apiClient.put<ApiResponse<ExampleData>>(
    `${API_ENDPOINTS.EXAMPLE}/${id}`,
    data
  );
  return response.data;
}

/**
 * 예제 데이터 삭제
 */
export async function deleteExample(id: string): Promise<void> {
  await apiClient.delete(`${API_ENDPOINTS.EXAMPLE}/${id}`);
}
