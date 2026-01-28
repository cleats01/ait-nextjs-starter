import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  isToday,
  isYesterday,
  parseISO,
  isValid,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜 유틸리티 함수
 * 한국어 로케일을 기본으로 사용합니다.
 */

/**
 * 한국어 형식으로 날짜 포맷팅
 */
export function formatKoreanDate(
  date: Date | string | number,
  formatStr: string = 'yyyy년 MM월 dd일'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  if (!isValid(dateObj)) {
    return '';
  }
  return format(dateObj, formatStr, { locale: ko });
}

/**
 * 상대 시간 표시 (예: "3분 전", "2시간 전")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  if (!isValid(dateObj)) {
    return '';
  }
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ko });
}

/**
 * 상대 시간 표시 (엄격한 버전, "약" 같은 표현 제거)
 */
export function formatRelativeTimeStrict(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  if (!isValid(dateObj)) {
    return '';
  }
  return formatDistanceToNowStrict(dateObj, { addSuffix: true, locale: ko });
}

/**
 * 스마트 날짜 포맷팅
 * - 오늘: "오늘 HH:mm"
 * - 어제: "어제 HH:mm"
 * - 이번 주: "월요일 HH:mm"
 * - 올해: "MM월 dd일 HH:mm"
 * - 작년 이전: "yyyy년 MM월 dd일 HH:mm"
 */
export function formatSmartDate(date: Date | string | number): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  if (!isValid(dateObj)) {
    return '';
  }

  if (isToday(dateObj)) {
    return `오늘 ${format(dateObj, 'HH:mm')}`;
  }

  if (isYesterday(dateObj)) {
    return `어제 ${format(dateObj, 'HH:mm')}`;
  }

  const now = new Date();
  const diffDays = differenceInDays(now, dateObj);

  if (diffDays < 7) {
    // 이번 주
    return format(dateObj, 'EEEE HH:mm', { locale: ko });
  }

  if (dateObj.getFullYear() === now.getFullYear()) {
    // 올해
    return format(dateObj, 'MM월 dd일 HH:mm', { locale: ko });
  }

  // 작년 이전
  return format(dateObj, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
}

/**
 * 경과 시간을 분 단위로 계산
 */
export function getMinutesAgo(date: Date | string | number): number {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  if (!isValid(dateObj)) {
    return 0;
  }
  return differenceInMinutes(new Date(), dateObj);
}

/**
 * 경과 시간을 시간 단위로 계산
 */
export function getHoursAgo(date: Date | string | number): number {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  if (!isValid(dateObj)) {
    return 0;
  }
  return differenceInHours(new Date(), dateObj);
}

/**
 * 경과 시간을 일 단위로 계산
 */
export function getDaysAgo(date: Date | string | number): number {
  const dateObj = typeof date === 'string' ? parseISO(date) : new Date(date);
  if (!isValid(dateObj)) {
    return 0;
  }
  return differenceInDays(new Date(), dateObj);
}

/**
 * ISO 문자열을 Date 객체로 변환 (안전)
 */
export function parseDate(date: Date | string | number): Date | null {
  if (date instanceof Date) {
    return isValid(date) ? date : null;
  }
  if (typeof date === 'string') {
    const parsed = parseISO(date);
    return isValid(parsed) ? parsed : null;
  }
  const dateObj = new Date(date);
  return isValid(dateObj) ? dateObj : null;
}
