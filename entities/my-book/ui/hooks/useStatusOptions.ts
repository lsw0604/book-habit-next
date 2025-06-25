import type { MyBookStatus } from '../../model';
import { BOOK_STATUS_OPTIONS } from '../constants';

export const useStatusOptions = () => {
  const getStatusLabel = (value?: MyBookStatus): string => {
    return (
      BOOK_STATUS_OPTIONS.find(option => option.value === value)?.label ||
      String(value)
    );
  };

  return {
    getStatusLabel,
    statusOptions: BOOK_STATUS_OPTIONS,
  };
};
