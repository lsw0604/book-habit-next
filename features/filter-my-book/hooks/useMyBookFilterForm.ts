import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';
import {
  DEFAULT_MY_BOOK_FILTER,
  MyBookFilterType,
  myBookFilterSchema,
} from '../model';

export const useMyBookFilterForm = (initialValue?: MyBookFilterType) =>
  useFormWithSchema(myBookFilterSchema, {
    defaultValues: initialValue ?? DEFAULT_MY_BOOK_FILTER,
  });
