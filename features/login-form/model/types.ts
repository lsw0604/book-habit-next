import { LoginType } from '@/features/login-form/model/schema';
import { Control } from 'react-hook-form';

export interface LoginControllerProps {
  control: Control<LoginType>;
}

export interface LoginFormErrorProps {
  isError: boolean;
  error: any;
}
