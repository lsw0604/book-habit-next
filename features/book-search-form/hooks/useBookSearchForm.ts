'use client';

import { useFormWithSchema } from '@/shared/hooks';

import {
  type BookSearchFormType,
  bookSearchFormSchema,
  DEFAULT_BOOK_SEARCH_FORM,
} from '../model';

export const useBookSearchForm = (initialValue?: BookSearchFormType) =>
  useFormWithSchema(bookSearchFormSchema, {
    defaultValues: DEFAULT_BOOK_SEARCH_FORM,
    values: initialValue,
  });
