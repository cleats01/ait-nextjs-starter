'use client';

import { useEffect } from 'react';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 서비스에 에러 전송
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">문제가 발생했습니다</h1>
      <p className="mb-8 text-gray-600">
        {error.message || '예상치 못한 오류가 발생했습니다.'}
      </p>
      <button
        onClick={reset}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        다시 시도
      </button>
    </div>
  );
}
