import { BOOK_RATINGS, BOOK_STATUS_OPTIONS } from '../model/constants';
import { MyBookStatus } from '../model/types';

export const getBookStatusLabel = (status: MyBookStatus): string => {
  return (
    BOOK_STATUS_OPTIONS.find(option => option.value === status)?.label || ''
  );
};

export const getBookRatingText = (rating: number): string => {
  return BOOK_RATINGS.find(r => r.rating === rating)?.text || '평가 없음';
};
