import { Control, FormState } from 'react-hook-form';
import { BookSearchParamsType } from '@/features/book-search/model/schema';

export interface BookSearchControllerProps {
  control: Control<BookSearchParamsType>;
  formState?: FormState<BookSearchParamsType>;
}

export interface BookSearchFormProps {
  className?: string;
}

export interface BookSearchListNotFoundProps {
  query?: string;
  isError?: boolean;
  errorMessage?: string;
  refetch?: () => void;
}
