'use client';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="mb-4 text-2xl font-bold">
            심각한 오류가 발생했습니다
          </h1>
          <p className="mb-8 text-gray-600">
            {error.message ||
              '애플리케이션에서 예상치 못한 오류가 발생했습니다.'}
          </p>
          <button
            onClick={reset}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
