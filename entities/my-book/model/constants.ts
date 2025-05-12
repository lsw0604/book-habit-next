import { BookRating, BookStatusOption } from './types';

export const BOOK_RATINGS: readonly BookRating[] = [
  { rating: 0, text: '평가 없음' },
  { rating: 1, text: '⭐' },
  { rating: 2, text: '⭐⭐' },
  { rating: 3, text: '⭐⭐⭐' },
  { rating: 4, text: '⭐⭐⭐⭐' },
  { rating: 5, text: '⭐⭐⭐⭐⭐' },
];

export const BOOK_STATUS_OPTIONS: readonly BookStatusOption[] = [
  { value: 'WANT_TO_READ', label: '읽고 싶은 책' },
  { value: 'CURRENTLY_READING', label: '현재 읽는 중' },
  { value: 'READ', label: '읽은 책' },
];
