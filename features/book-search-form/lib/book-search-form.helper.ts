import {
  type BookSearchFormType,
  BOOK_SEARCH_FORM_SELECT_OPTIONS,
} from '../model';

export const getTargetLabel = (value: BookSearchFormType['target']): string =>
  BOOK_SEARCH_FORM_SELECT_OPTIONS.find(opt => opt.value === value)?.label ||
  '선택하세요';
