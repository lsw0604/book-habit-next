import { format } from 'date-fns';
import { DATE_FORMAT } from '../constants';

/**
 * * 숫자 문자열을 YYYY-MM-DD 형식으로 포맷팅
 */
export const formatDateInput = (digits: string): string => {
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

/**
 * * Date 객체를 입력 필드용 문자열로 포맷팅
 */
export const formatDateForInput = (date: Date): string => {
  return format(date, DATE_FORMAT.INPUT);
};

/**
 * * 입력값에서 숫자만 추출하고 최대 길이 제한
 */
export const extractDigits = (input: string, maxLength: number): string => {
  return input.replace(/[^0-9]/g, '').slice(0, maxLength);
};
