/**
 * 에러 표시 컴포넌트
 */

type ErrorDisplayProps = {
  error: Error | string;
  onRetry?: () => void;
  retryText?: string;
};

export function ErrorDisplay({
  error,
  onRetry,
  retryText = '다시 시도',
}: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6">
      <div className="text-red-600">
        <svg
          className="h-12 w-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-center text-sm text-red-800">{errorMessage}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
