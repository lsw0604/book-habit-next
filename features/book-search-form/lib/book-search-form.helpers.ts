import type { BookSearchParamsType } from '@/entities/book';

import { BOOK_SEARCH_TARGET_SELECT_OPTIONS } from '../constants';

export const getTargetLabel = (value: BookSearchParamsType['target']): string =>
  BOOK_SEARCH_TARGET_SELECT_OPTIONS.find(opt => opt.value === value)?.label ||
  '선택하세요';
