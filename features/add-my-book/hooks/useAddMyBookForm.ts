import { useFormWithSchema } from '@/shared/hooks/form';

import {
  addMyBookSchema,
  AddMyBookType,
  DEFAULT_ADD_MY_BOOK,
} from '../schemas';

export const useAddMyBookForm = (initialValue?: AddMyBookType) =>
  useFormWithSchema(addMyBookSchema, {
    defaultValues: initialValue ?? DEFAULT_ADD_MY_BOOK,
  });
