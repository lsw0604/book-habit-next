import { Sort, Target } from '@/entities/book/model';

import { BookSearchParamsType } from '../schemas';

export const BOOK_SEARCH_MIN_SIZE = 10;
export const BOOK_SEARCH_MAX_SIZE = 50;
export const BOOK_SEARCH_SORT_VALUES: readonly BookSearchParamsType['sort'][] =
  [Sort.ACCURACY, Sort.LATEST] as const;
export const BOOK_SEARCH_TARGET_VALUES: readonly BookSearchParamsType['target'][] =
  [Target.ISBN, Target.PERSON, Target.PUBLISHER, Target.TITLE] as const;
