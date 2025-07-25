import { Control, FormState } from 'react-hook-form';

import { BookSearchParamsType } from '@/features/book-search/model/schema';

export interface BookSearchControllerProps {
  control: Control<BookSearchParamsType>;
  formState?: FormState<BookSearchParamsType>;
}
