import {
  type BookSearchParams,
  Sort,
  Target,
  BOOK_SEARCH_MAX_SIZE,
  BOOK_SEARCH_MIN_SIZE,
  BOOK_SEARCH_SORT_VALUES,
  BOOK_SEARCH_TARGET_VALUES,
} from '../model';

const isSortValue = (value: string): value is BookSearchParams['sort'] =>
  BOOK_SEARCH_SORT_VALUES.includes(value as BookSearchParams['sort']);

const isTargetValue = (value: string): value is BookSearchParams['target'] =>
  BOOK_SEARCH_TARGET_VALUES.includes(value as BookSearchParams['target']);

export const queryParser = (query: string): string => query || '';

export const sizeParser = (size: string): number => {
  const num = parseInt(size, 10);

  if (Number.isNaN(num)) return BOOK_SEARCH_MIN_SIZE;

  return Math.min(Math.max(num, BOOK_SEARCH_MIN_SIZE), BOOK_SEARCH_MAX_SIZE);
};

export const sortParser = (sort: string): BookSearchParams['sort'] =>
  isSortValue(sort) ? sort : Sort.ACCURACY;

export const targetParser = (target: string): BookSearchParams['target'] =>
  isTargetValue(target) ? target : Target.TITLE;
