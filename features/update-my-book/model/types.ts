import { Control } from 'react-hook-form';

import { MyBookDetail } from '@/entities/my-book/model';

import { UpdateMyBookType } from './schema';

export interface MyBookUpdateFormProps {
  data: Partial<Pick<MyBookDetail, 'rating' | 'status'>>;
  myBookId: number;
}

export interface MyBookUpdateControllerProps {
  control: Control<UpdateMyBookType>;
}
