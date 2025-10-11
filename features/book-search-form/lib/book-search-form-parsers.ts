import {
  BOOK_SEARCH_MAX_SIZE,
  BOOK_SEARCH_MIN_SIZE,
  BOOK_SEARCH_SORT_VALUES,
  BOOK_SEARCH_TARGET_VALUES,
} from '../constants';
import {
  type BookSearchParamsType,
  DEFAULT_BOOK_SEARCH_PARAMS,
} from '../schemas';

const isSortValue = (value: string): value is BookSearchParamsType['sort'] =>
  BOOK_SEARCH_SORT_VALUES.includes(value as BookSearchParamsType['sort']);

const isTargetValue = (
  value: string
): value is BookSearchParamsType['target'] =>
  BOOK_SEARCH_TARGET_VALUES.includes(value as BookSearchParamsType['target']);

export const queryParser = (query: string): string =>
  query || DEFAULT_BOOK_SEARCH_PARAMS.query;

export const sizeParser = (size: string): number => {
  const num = parseInt(size, 10);

  if (Number.isNaN(num)) return DEFAULT_BOOK_SEARCH_PARAMS.size;

  return num >= BOOK_SEARCH_MIN_SIZE && num <= BOOK_SEARCH_MAX_SIZE
    ? num
    : DEFAULT_BOOK_SEARCH_PARAMS.size;
};

export const sortParser = (sort: string): BookSearchParamsType['sort'] =>
  isSortValue(sort) ? sort : DEFAULT_BOOK_SEARCH_PARAMS.sort;

export const targetParser = (target: string): BookSearchParamsType['target'] =>
  isTargetValue(target) ? target : DEFAULT_BOOK_SEARCH_PARAMS.target;
