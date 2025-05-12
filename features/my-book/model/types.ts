import { MyBookParamsType } from '@/entities/my-book/model/schema';
import { Control } from 'react-hook-form';

export interface MyBookControllerProps {
  control: Control<MyBookParamsType>;
}
