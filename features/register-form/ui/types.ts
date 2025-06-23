import type { RegisterType } from '@/entities/auth/model';
import type { Control } from 'react-hook-form';

export interface RegisterControllerProps {
  control: Control<RegisterType>;
}
