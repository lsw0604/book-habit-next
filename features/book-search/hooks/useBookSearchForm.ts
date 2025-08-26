'use client';

import {
  bookSearchParamsSchema,
  BookSearchParamsType,
  DEFAULT_BOOK_SEARCH_PARAMS,
} from '@/features/book-search/schemas';
import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

export const useBookSearchForm = (initialValue?: BookSearchParamsType) =>
  useFormWithSchema(bookSearchParamsSchema, {
    defaultValues: DEFAULT_BOOK_SEARCH_PARAMS,
    values: initialValue,
  });
