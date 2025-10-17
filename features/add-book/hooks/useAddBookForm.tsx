import { useFormWithSchema } from '@/shared/hooks/form';

import { type AddBookType, addBookSchema, DEFAULT_ADD_BOOK } from '../schemas';

export const useAddBookForm = (initialValue?: AddBookType) =>
  useFormWithSchema(addBookSchema, {
    defaultValues: initialValue ?? DEFAULT_ADD_BOOK,
  });
