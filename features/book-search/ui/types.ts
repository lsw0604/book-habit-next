import { Control, FormState } from 'react-hook-form';
import { BookSearchParamsType } from '../model/schema';
import { KakaoDocument } from '../api/types';

export interface BookSearchControllerProps {
  control: Control<BookSearchParamsType>;
}

export interface BookSearchPopoverProps extends BookSearchControllerProps {
  formState: FormState<BookSearchParamsType>;
}

export interface BookSearchItemProps {
  item: KakaoDocument;
}

export interface BookSearchListNotFoundProps {
  query?: string;
  isError?: boolean;
  errorMessage?: string;
  refetch?: () => void;
}
