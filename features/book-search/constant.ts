import { Sort, Target } from '@/entities/book/model';

import { BookSearchParamsType } from './model/schema';

export const BOOK_SEARCH_MIN_SIZE = 10;
export const BOOK_SEARCH_MAX_SIZE = 50;

export const BOOK_SEARCH_SORT_VALUES = [Sort.ACCURACY, Sort.LATEST] as const;

export const BOOK_SEARCH_TARGET_VALUES = [
  Target.ISBN,
  Target.PERSON,
  Target.PUBLISHER,
  Target.TITLE,
] as const;

export const BOOK_SEARCH_FIELDS: Array<keyof BookSearchParamsType> = [
  'target',
  'query',
  'size',
  'sort',
] as const;
export type BookSearchFieldType = (typeof BOOK_SEARCH_FIELDS)[number];

export const BOOK_SEARCH_SORT_FIELDS: BookSearchParamsType['sort'][] = [
  Sort.ACCURACY,
  Sort.LATEST,
] as const;

export const BOOK_SEARCH_TARGET_FIELDS: BookSearchParamsType['target'][] = [
  Target.ISBN,
  Target.PERSON,
  Target.PUBLISHER,
  Target.TITLE,
] as const;
