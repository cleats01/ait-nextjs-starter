import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import {
  getExample,
  createExample,
  updateExample,
  deleteExample,
  type ExampleData,
  type CreateExampleRequest,
} from '../services/example.service';

/**
 * API Query 훅 예제
 * 실제 사용 시 이 파일을 참고하여 새로운 훅을 만들거나 삭제하세요.
 */

/**
 * 예제 데이터 조회 훅
 */
export function useExampleQuery(
  name?: string,
  options?: Omit<UseQueryOptions<ExampleData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ExampleData>({
    queryKey: ['example', name],
    queryFn: () => getExample(name),
    ...options,
  });
}

/**
 * 예제 데이터 생성 훅
 */
export function useCreateExample(
  options?: UseMutationOptions<ExampleData, Error, CreateExampleRequest>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExample,
    onSuccess: () => {
      // 성공 시 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['example'] });
    },
    ...options,
  });
}

/**
 * 예제 데이터 수정 훅
 */
export function useUpdateExample(
  options?: UseMutationOptions<
    ExampleData,
    Error,
    { id: string; data: Partial<CreateExampleRequest> }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateExample(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['example'] });
    },
    ...options,
  });
}

/**
 * 예제 데이터 삭제 훅
 */
export function useDeleteExample(
  options?: UseMutationOptions<void, Error, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExample,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['example'] });
    },
    ...options,
  });
}
