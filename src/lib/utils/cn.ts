import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS 클래스명을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 결합하여 클래스명 충돌을 자동으로 해결합니다.
 *
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4' (px-2는 px-4로 덮어씀)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
