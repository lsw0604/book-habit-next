import type { BookRatingOption, BookStatusOption } from '../types';
import { MyBookStatus } from '../../model';

export const BOOK_RATING_OPTIONS: readonly BookRatingOption[] = [
  { rating: 0, text: '평가 없음' },
  { rating: 1, text: '⭐' },
  { rating: 2, text: '⭐⭐' },
  { rating: 3, text: '⭐⭐⭐' },
  { rating: 4, text: '⭐⭐⭐⭐' },
  { rating: 5, text: '⭐⭐⭐⭐⭐' },
];

export const BOOK_STATUS_OPTIONS: readonly BookStatusOption[] = [
  { value: MyBookStatus.WANT_TO_READ, label: '읽고 싶은 책' },
  { value: MyBookStatus.CURRENTLY_READING, label: '현재 읽는 중' },
  { value: MyBookStatus.READ, label: '읽은 책' },
];
