import { format } from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

export const formatDateObjectToString = (date: Date): string => {
  return format(date, DATE_FORMAT);
};
