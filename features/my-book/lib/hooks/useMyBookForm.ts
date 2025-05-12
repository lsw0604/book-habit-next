import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';
import {
  MyBookParamsType,
  DEFAULT_MY_BOOK_PARAMS,
  myBookParamsSchema,
} from '@/entities/my-book/model/schema';

export const useMyBookForm = (initialValue?: MyBookParamsType) =>
  useFormWithSchema(myBookParamsSchema, {
    defaultValues: initialValue ?? DEFAULT_MY_BOOK_PARAMS,
  });
