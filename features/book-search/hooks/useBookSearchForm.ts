import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';
import {
  bookSearchParamsSchema,
  BookSearchParamsType,
  DEFAULT_BOOK_SEARCH_PARAMS,
} from '@/features/book-search/model/schema';

export const useBookSearchForm = (initialValue?: BookSearchParamsType) =>
  useFormWithSchema(bookSearchParamsSchema, {
    defaultValues: initialValue ?? DEFAULT_BOOK_SEARCH_PARAMS,
    mode: 'onSubmit',
  });
