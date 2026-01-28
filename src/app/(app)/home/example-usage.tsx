'use client';

import { useExampleQuery, useCreateExample } from '@/lib/hooks/use-api-query';
import { Loading } from '@/components/ui';
import { ErrorDisplay } from '@/components/ui';

/**
 * API 호출 사용 예시 컴포넌트
 * 실제 사용 시 이 파일을 참고하거나 삭제하세요.
 */
export function ExampleUsage() {
  const { data, isLoading, error, refetch } = useExampleQuery('John');
  const createMutation = useCreateExample();

  const handleCreate = async () => {
    try {
      await createMutation.mutateAsync({
        name: 'New Item',
        message: 'This is a new item',
      });
      // 성공 시 자동으로 refetch됨
    } catch (error) {
      console.error('Failed to create:', error);
    }
  };

  if (isLoading) {
    return <Loading text="데이터를 불러오는 중..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={refetch} />;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">예제 데이터</h2>
      {data && (
        <div className="rounded-lg border p-4">
          <p className="font-semibold">{data.name}</p>
          {data.message && <p className="text-gray-600">{data.message}</p>}
          {data.timestamp && (
            <p className="text-sm text-gray-400">{data.timestamp}</p>
          )}
        </div>
      )}
      <button
        onClick={handleCreate}
        disabled={createMutation.isPending}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {createMutation.isPending ? '생성 중...' : '새 항목 생성'}
      </button>
    </div>
  );
}
