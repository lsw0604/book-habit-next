import {
  bookSearchParamsSchema,
  BookSearchParamsType,
  DEFAULT_BOOK_SEARCH_PARAMS,
} from '@/features/book-search/model/schema';
import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

export const useBookSearchForm = (initialValue?: BookSearchParamsType) =>
  useFormWithSchema(bookSearchParamsSchema, {
    defaultValues: initialValue ?? DEFAULT_BOOK_SEARCH_PARAMS,
    mode: 'onSubmit',
  });
