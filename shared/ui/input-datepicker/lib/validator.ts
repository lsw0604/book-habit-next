import { isValid, parse } from 'date-fns';
import {
  DATE_CONSTRAINTS,
  DATE_FORMAT,
  DATE_LENGTH,
  ERROR_MESSAGES,
} from './constants';

interface DateValidateResult {
  date: Date | null;
  error: string | null;
}

const validateYear = (year: number): string | null => {
  if (year < DATE_CONSTRAINTS.MIN_YEAR || year > DATE_CONSTRAINTS.MAX_YEAR) {
    return ERROR_MESSAGES.INVALID_YEAR;
  }
  return null;
};

const validateMonth = (month: number): string | null => {
  if (
    month < DATE_CONSTRAINTS.MIN_MONTH ||
    month > DATE_CONSTRAINTS.MAX_MONTH
  ) {
    return ERROR_MESSAGES.INVALID_MONTH;
  }
  return null;
};

export const parseAndValidateDate = (digits: string): DateValidateResult => {
  const parsedDate = parse(digits, DATE_FORMAT.PARSE, new Date());
  const year = parseInt(digits.substring(0, DATE_LENGTH.YEAR), 10);

  if (isValid(parsedDate) && parsedDate.getFullYear() === year) {
    return {
      date: parsedDate,
      error: null,
    };
  }
  return { date: null, error: ERROR_MESSAGES.INVALID_DATE };
};

export const validatePartialDate = (digits: string): string | null => {
  if (digits.length >= DATE_LENGTH.YEAR) {
    const year = parseInt(digits.substring(0, DATE_LENGTH.YEAR), 10);
    const yearError = validateYear(year);
    if (yearError) return yearError;
  }

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
