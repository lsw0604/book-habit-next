import { MY_BOOK_STATUS_OPTIONS } from '../constants';
import { MyBookStatus } from '../model';

export const getMyBookStatusLabel = (value?: MyBookStatus) =>
  MY_BOOK_STATUS_OPTIONS.find(option => option.value === value)?.label ||
  String(value);

export const calculateProgressPercentage =
  (currentPage: number, totalPage: number | null): number | null => {
    if (totalPage && totalPage > 0) {
      return Math.round((currentPage / totalPage) * 100);
    }
    return null;
  };