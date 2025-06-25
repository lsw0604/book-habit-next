import type { FilterMyBookOrder } from '../../model';
import { FILTER_BOOK_ORDER_OPTIONS } from '../constant';

export const useMyBookFilterOrder = () => {
  const getOrderLabel = (value: FilterMyBookOrder): string => {
    return (
      FILTER_BOOK_ORDER_OPTIONS.find(item => item.value === value)?.label ||
      String(value)
    );
  };

  return {
    orderOptions: FILTER_BOOK_ORDER_OPTIONS,
    getOrderLabel,
  };
};
