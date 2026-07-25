import { useFormWithSchema } from '@/shared/hooks/form';

import {
  type AddMyBookHistoryType,
  DEFAULT_ADD_MY_BOOK_HISTORY,
  addMyBookHistorySchema,
} from '../schema';

export const useAddMyBookHistoryForm = (initialValue?: AddMyBookHistoryType) =>
  useFormWithSchema(addMyBookHistorySchema, {
    defaultValues: initialValue ?? DEFAULT_ADD_MY_BOOK_HISTORY,
  });
