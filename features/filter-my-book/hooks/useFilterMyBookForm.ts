import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

import {
  DEFAULT_FILTER_MY_BOOK,
  FilterMyBookType,
  filterMyBookSchema,
} from '../schemas';

export const useFilterMyBookForm = (initialValue?: FilterMyBookType) =>
  useFormWithSchema(filterMyBookSchema, {
    defaultValues: initialValue ?? DEFAULT_FILTER_MY_BOOK,
  });
