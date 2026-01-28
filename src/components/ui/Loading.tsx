/**
 * 로딩 컴포넌트
 */

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
};

export function Loading({ size = 'md', text }: LoadingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-blue-500`}
      />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}
