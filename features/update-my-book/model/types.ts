import { MyBookDetail } from '@/entities/my-book/api/types';
import { UpdateMyBookType } from '@/features/update-my-book/model/schema';
import { Control } from 'react-hook-form';

export interface MyBookUpdateFormProps {
  data: Partial<Pick<MyBookDetail, 'rating' | 'status'>>;
  myBookId: number;
}

export interface MyBookUpdateControllerProps {
  control: Control<UpdateMyBookType>;
}
