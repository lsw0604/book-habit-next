import { BookSearchParams, Sort, Target } from './book-search-params.model';

const BOOK_SEARCH_MIN_SIZE = 10;
const BOOK_SEARCH_MAX_SIZE = 50;

const BOOK_SEARCH_SORT_VALUES: readonly BookSearchParams['sort'][] = [
  Sort.ACCURACY,
  Sort.LATEST,
];
const BOOK_SEARCH_TARGET_VALUES: readonly BookSearchParams['target'][] = [
  Target.ISBN,
  Target.PERSON,
  Target.PUBLISHER,
  Target.TITLE,
] as const;

export {
  BOOK_SEARCH_MAX_SIZE,
  BOOK_SEARCH_MIN_SIZE,
  BOOK_SEARCH_SORT_VALUES,
  BOOK_SEARCH_TARGET_VALUES,
};
