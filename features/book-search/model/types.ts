import { Control } from 'react-hook-form';
import { BookSearchParamsType } from '../model/schema';

export interface BookSearchControllerProps {
  control: Control<BookSearchParamsType>;
  isSubmitted?: boolean;
}
