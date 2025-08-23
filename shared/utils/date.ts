import { parseISO } from 'date-fns';

export const normalizedDate = (date: string | Date): Date => {
  if (typeof date === 'string') {
    return parseISO(date);
  }

  return date;
};
