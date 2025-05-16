import {
  BookOrder,
  BookRating,
  BookStatusOption,
  MyBookOrder,
  MyBookStatus,
} from './types';

export const BOOK_RATINGS: readonly BookRating[] = [
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

export const BOOK_FILTER_OPTIONS: readonly BookStatusOption[] = [
  { value: MyBookStatus.ALL, label: '전체보기' },
  { value: MyBookStatus.WANT_TO_READ, label: '읽기전' },
  { value: MyBookStatus.CURRENTLY_READING, label: '읽는중' },
  { value: MyBookStatus.READ, label: '다읽음' },
];

export const BOOK_ORDER_OPTIONS: readonly BookOrder[] = [
  { value: MyBookOrder.asc, label: '오름차순' },
  { value: MyBookOrder.desc, label: '내림차순' },
];
