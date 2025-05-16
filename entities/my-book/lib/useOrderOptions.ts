import { BOOK_ORDER_OPTIONS, MyBookOrder } from '../model';

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
