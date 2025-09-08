import {
  type EditMyBookHistoryType,
  editMyBookHistorySchema,
} from '@/entities/my-book-history';
import { useFormWithSchema } from '@/shared/hooks';

export const useEditMyBookHistoryForm = (initialValue: EditMyBookHistoryType) =>
  useFormWithSchema(editMyBookHistorySchema, {
    defaultValues: initialValue,
  });
