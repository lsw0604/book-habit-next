'use client';

import { useFormWithSchema } from '@/shared/hooks';

import {
  bookSearchParamsSchema,
  BookSearchParamsType,
  DEFAULT_BOOK_SEARCH_PARAMS,
} from '../schemas';

export const useBookSearchForm = (initialValue?: BookSearchParamsType) =>
  useFormWithSchema(bookSearchParamsSchema, {
    defaultValues: DEFAULT_BOOK_SEARCH_PARAMS,
    values: initialValue,
  });
