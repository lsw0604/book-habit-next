import type { MyBookOrder } from '../../model';
import { BOOK_ORDER_OPTIONS } from '../constants';

export const useOrderOptions = () => {
  const getOrderLabel = (value: MyBookOrder): string => {
    return (
      BOOK_ORDER_OPTIONS.find(item => item.value === value)?.label ||
      String(value)
    );
  };

  return {
    orderOptions: BOOK_ORDER_OPTIONS,
    getOrderLabel,
  };
};
