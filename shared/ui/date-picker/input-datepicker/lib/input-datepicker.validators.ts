import type { DateValidationResult } from './type';
import { isValid, parse } from 'date-fns';
import {
  DATE_CONSTRAINTS,
  ERROR_MESSAGES,
  DATE_FORMAT,
  DATE_LENGTH,
} from '../constants';

/**
 * * 연도 유효성 검사
 */
export const validateYear = (year: number): string | null => {
  if (year < DATE_CONSTRAINTS.MIN_YEAR || year > DATE_CONSTRAINTS.MAX_YEAR) {
    return ERROR_MESSAGES.INVALID_YEAR;
  }
  return null;
};

/**
 * * 월 유효성 검사
 */
export const validateMonth = (month: number): string | null => {
  if (
    month < DATE_CONSTRAINTS.MIN_MONTH ||
    month > DATE_CONSTRAINTS.MAX_MONTH
  ) {
    return ERROR_MESSAGES.INVALID_MONTH;
  }
  return null;
};

/**
 * * 완전한 날짜 유효성 검사
 */
export const validateCompleteDate = (digits: string): DateValidationResult => {
  const parsedDate = parse(digits, DATE_FORMAT.PARSE, new Date());
  const year = parseInt(digits.substring(0, DATE_LENGTH.YEAR), 10);

  if (isValid(parsedDate) && parsedDate.getFullYear() === year) {
    return { date: parsedDate, error: null };
  }

  return { date: null, error: ERROR_MESSAGES.INVALID_DATE };
};

/**
 * * 입력 단계별 유효성 검사
 */
export const validateInputStep = (digits: string): string | null => {
  // 연도 검증 (4자리 이상일 때)
  if (digits.length >= DATE_LENGTH.YEAR) {
    const year = parseInt(digits.substring(0, DATE_LENGTH.YEAR), 10);
    const yearError = validateYear(year);
    if (yearError) return yearError;
  }

  // 월 검증 (6자리 이상일 때)
  if (digits.length >= DATE_LENGTH.MONTH) {
    const month = parseInt(
      digits.substring(DATE_LENGTH.YEAR, DATE_LENGTH.MONTH),
      10
    );
    const monthError = validateMonth(month);
    if (monthError) return monthError;
  }

  return null;
};
