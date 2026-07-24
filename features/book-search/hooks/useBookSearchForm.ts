'use client';

import { useFormWithSchema } from '@/shared/hooks';

import {
  BookSearchParams,
  bookSearchParamsSchema,
  DEFAULT_BOOK_SEARCH_PARAMS,
} from '../schema';

export const useBookSearchForm = (initialValue?: BookSearchParams) =>
  useFormWithSchema(bookSearchParamsSchema, {
    defaultValues: DEFAULT_BOOK_SEARCH_PARAMS,
    values: initialValue,
  });
