import { RegisterType } from '@/features/register-form/model/schema';
import { Control } from 'react-hook-form';

export interface RegisterControllerProps {
  control: Control<RegisterType>;
}
