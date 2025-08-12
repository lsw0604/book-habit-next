import { Control, FormState } from 'react-hook-form';

import { BookSearchParamsType } from './schema';

export interface BookSearchControllerProps {
  control: Control<BookSearchParamsType>;
  formState?: FormState<BookSearchParamsType>;
}
