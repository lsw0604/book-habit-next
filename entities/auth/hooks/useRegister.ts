import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { type User, toUserViewModel } from '@/entities/user';
import type { ErrorResponseDTO } from '@/shared/api/types/error';

import { type RegisterPayload, authService } from '../api';

export const useRegister = () =>
  useMutation<User, AxiosError<ErrorResponseDTO>, RegisterPayload>({
    mutationFn: async payload => {
      const response = await authService.register(payload);
      return toUserViewModel(response);
    },
  });
