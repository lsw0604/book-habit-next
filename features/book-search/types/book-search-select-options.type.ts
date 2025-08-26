import { BOOK_SEARCH_SELECT_OPTIONS } from '../constants';

export type BookSearchTargetLabelType =
  (typeof BOOK_SEARCH_SELECT_OPTIONS)[number]['label'];
export type BookSearchTargetValueType =
  (typeof BOOK_SEARCH_SELECT_OPTIONS)[number]['value'];
