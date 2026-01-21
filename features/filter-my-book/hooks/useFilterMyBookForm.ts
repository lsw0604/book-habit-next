import { useFormWithSchema } from '@/shared/hooks/form/useFormWithSchema';

import {
  type FilterMyBookType,
  DEFAULT_FILTER_MY_BOOK,
  filterMyBookSchema,
} from '../model';

export const useFilterMyBookForm = (initialValue?: FilterMyBookType) =>
  useFormWithSchema(filterMyBookSchema, {
    defaultValues: initialValue ?? DEFAULT_FILTER_MY_BOOK,
  });
