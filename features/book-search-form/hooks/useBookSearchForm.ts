'use client';

import {
  bookSearchParamsSchema,
  BookSearchParamsType,
  DEFAULT_BOOK_SEARCH_PARAMS,
} from '@/entities/book';
import { useFormWithSchema } from '@/shared/hooks';

export const useBookSearchForm = (initialValue?: BookSearchParamsType) =>
  useFormWithSchema(bookSearchParamsSchema, {
    defaultValues: DEFAULT_BOOK_SEARCH_PARAMS,
    values: initialValue,
  });
