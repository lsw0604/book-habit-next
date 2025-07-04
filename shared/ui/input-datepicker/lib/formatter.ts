import { format } from 'date-fns';
import { DATE_FORMAT } from './constants';

export const addSeparatorsToDateString = (digits: string): string => {
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

export const formatDateObjectToString = (date: Date): string => {
  return format(date, DATE_FORMAT.INPUT);
};

export const extractDigits = (input: string, maxLength: number): string => {
  return input.replace(/[^0-9]/g, '').slice(0, maxLength);
};
