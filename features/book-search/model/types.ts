import { Control } from 'react-hook-form';

import { BookSearchParamsType } from './schema';

export interface BookSearchControllerProps {
  control: Control<BookSearchParamsType>;
  isSubmitted?: boolean;
}
