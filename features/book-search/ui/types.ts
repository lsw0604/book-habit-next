import { Control } from 'react-hook-form';
import { BookSearchParamsType } from '../model/schema';
import { KakaoDocument } from '../api/types';

export interface BookSearchControllerProps {
  control: Control<BookSearchParamsType>;
}

export interface BookSearchItemProps {
  item: KakaoDocument;
}
