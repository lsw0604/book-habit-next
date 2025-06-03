import { useFormWithSchema } from '@/shared/hooks/form';
import {
  addMyBookSchema,
  AddMyBookType,
  DEFAULT_ADD_MY_BOOK,
} from '../../model/schema';

export const useAddMyBookForm = (initialValue?: AddMyBookType) =>
  useFormWithSchema(addMyBookSchema, {
    defaultValues: initialValue ?? DEFAULT_ADD_MY_BOOK,
  });
