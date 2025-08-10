import { type AxiosError } from 'axios';
import { type Control } from 'react-hook-form';

import { type LoginType } from '@/entities/auth/model';
import { type ErrorResponseDTO } from '@/shared/api/types/error';

export interface LoginControllerProps {
  control: Control<LoginType>;
}

export interface LoginFormErrorProps {
  isError: boolean;
  error: AxiosError<ErrorResponseDTO> | null;
}
