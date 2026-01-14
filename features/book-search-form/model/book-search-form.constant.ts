import { Target } from '@/entities/book';

export const BOOK_SEARCH_FORM_SELECT_OPTIONS = [
  { label: '제목', value: Target.TITLE },
  { label: 'ISBN', value: Target.ISBN },
  { label: '작가', value: Target.PERSON },
  { label: '출판사', value: Target.PUBLISHER },
] as const;
