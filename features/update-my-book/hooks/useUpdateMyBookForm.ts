import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

import {
  DEFAULT_UPDATE_MY_BOOK,
  updateMyBookSchema,
  UpdateMyBookType,
} from '../model/schema';

export const useUpdateMyBookForm = (initialValue: UpdateMyBookType) =>
  useFormWithSchema(updateMyBookSchema, {
    defaultValues: initialValue ?? DEFAULT_UPDATE_MY_BOOK,
  });
