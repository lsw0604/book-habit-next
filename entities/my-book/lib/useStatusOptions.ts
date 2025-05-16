import type { MyBookStatus } from '../model';
import { BOOK_FILTER_OPTIONS, BOOK_STATUS_OPTIONS } from '../model';

export const useStatusOptions = () => {
  const getStatusLabel = (value?: MyBookStatus): string => {
    return (
      BOOK_STATUS_OPTIONS.find(option => option.value === value)?.label ||
      String(value)
    );
  };

  const getFilterLabel = (value: MyBookStatus): string => {
    return (
      BOOK_FILTER_OPTIONS.find(option => option.value === value)?.label ||
      String(value)
    );
  };

  return {
    getStatusLabel,
    getFilterLabel,
    statusOptions: BOOK_STATUS_OPTIONS,
    filterOptions: BOOK_FILTER_OPTIONS,
  };
};
