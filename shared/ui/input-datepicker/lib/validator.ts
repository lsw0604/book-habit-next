import { isValid, parse } from 'date-fns';

import {
  INPUT_DATEPICKER_CONSTRAINTS,
  INPUT_DATEPICKER_ERROR_MESSAGES,
  INPUT_DATEPICKER_FORMAT,
  INPUT_DATEPICKER_LENGTH,
} from './constants';

interface DateValidateResult {
  date: Date | null;
  error: string | null;
}

const validateYear = (year: number): string | null => {
  if (
    year < INPUT_DATEPICKER_CONSTRAINTS.MIN_YEAR ||
    year > INPUT_DATEPICKER_CONSTRAINTS.MAX_YEAR
  ) {
    return INPUT_DATEPICKER_ERROR_MESSAGES.INVALID_YEAR;
  }
  return null;
};

const validateMonth = (month: number): string | null => {
  if (
    month < INPUT_DATEPICKER_CONSTRAINTS.MIN_MONTH ||
    month > INPUT_DATEPICKER_CONSTRAINTS.MAX_MONTH
  ) {
    return INPUT_DATEPICKER_ERROR_MESSAGES.INVALID_MONTH;
  }
  return null;
};

export const parseAndValidateDate = (digits: string): DateValidateResult => {
  const parsedDate = parse(digits, INPUT_DATEPICKER_FORMAT.PARSE, new Date());
  const year = parseInt(digits.substring(0, INPUT_DATEPICKER_LENGTH.YEAR), 10);

  if (isValid(parsedDate) && parsedDate.getFullYear() === year) {
    return {
      date: parsedDate,
      error: null,
    };
  }
  return { date: null, error: INPUT_DATEPICKER_ERROR_MESSAGES.INVALID_DATE };
};

export const validatePartialDate = (digits: string): string | null => {
  if (digits.length >= INPUT_DATEPICKER_LENGTH.YEAR) {
    const year = parseInt(
      digits.substring(0, INPUT_DATEPICKER_LENGTH.YEAR),
      10
    );
    const yearError = validateYear(year);
    if (yearError) return yearError;
  }

  if (digits.length >= INPUT_DATEPICKER_LENGTH.MONTH) {
    const month = parseInt(
      digits.substring(
        INPUT_DATEPICKER_LENGTH.YEAR,
        INPUT_DATEPICKER_LENGTH.MONTH
      ),
      10
    );
    const monthError = validateMonth(month);
    if (monthError) return monthError;
  }

  return null;
};
