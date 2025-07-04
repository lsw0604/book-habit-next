import { format } from 'date-fns';
import { DATE_FORMAT, DATE_LENGTH } from './constants';

export const addSeparatorsToDateString = (digits: string): string => {
  if (digits.length <= DATE_LENGTH.YEAR) return digits;
  if (digits.length <= DATE_LENGTH.YEAR + DATE_LENGTH.MONTH) {
    return `${digits.slice(0, DATE_LENGTH.YEAR)}-${digits.slice(DATE_LENGTH.YEAR)}`;
  }
  return `${digits.slice(0, DATE_LENGTH.YEAR)}-${digits.slice(DATE_LENGTH.YEAR, DATE_LENGTH.YEAR + DATE_LENGTH.MONTH)}-${digits.slice(DATE_LENGTH.YEAR + DATE_LENGTH.MONTH)}`;
};

export const formatDateObjectToString = (date: Date): string => {
  return format(date, DATE_FORMAT.INPUT);
};

export const extractDigits = (input: string, maxLength: number): string => {
  return input.replace(/[^0-9]/g, '').slice(0, maxLength);
};
