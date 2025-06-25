import { FilterMyBookStatus } from '../../model';
import { FILTER_BOOK_STATUS_OPTIONS } from '../constant';

export const useMyBookFilterStatus = () => {
  const getStatusLabel = (value: FilterMyBookStatus): string => {
    return (
      FILTER_BOOK_STATUS_OPTIONS.find(item => item.value === value)?.label ||
      String(value)
    );
  };

  return {
    statusOptions: FILTER_BOOK_STATUS_OPTIONS,
    getStatusLabel,
  };
};
