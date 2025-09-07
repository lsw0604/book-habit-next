import {
  type AddMyBookHistoryType,
  DEFAULT_ADD_MY_BOOK_HISTORY,
  addMyBookHistorySchema,
} from '@/entities/my-book-history';
import { useFormWithSchema } from '@/shared/hooks/form';

export const useAddMyBookHistoryForm = (initialValue?: AddMyBookHistoryType) =>
  useFormWithSchema(addMyBookHistorySchema, {
    defaultValues: initialValue ?? DEFAULT_ADD_MY_BOOK_HISTORY,
  });
