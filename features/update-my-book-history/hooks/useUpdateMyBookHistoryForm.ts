import { useFormWithSchema } from '@/shared/hooks';

import { type UpdateMyBookHistoryType, updateMyBookHistorySchema } from '../schema';

export const useUpdateMyBookHistoryForm = (initialValue: UpdateMyBookHistoryType) =>
  useFormWithSchema(updateMyBookHistorySchema, {
    defaultValues: initialValue,
  });
