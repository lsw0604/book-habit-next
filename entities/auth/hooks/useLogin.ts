import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { type User, toUserViewModel } from '@/entities/user';
import type { ErrorResponseDTO } from '@/shared/api/types/error';

import { type LoginPayload, authService } from '../api';

export const useLogin = () =>
  useMutation<User, AxiosError<ErrorResponseDTO>, LoginPayload>({
    mutationFn: async payload => {
      const response = await authService.login(payload);
      return toUserViewModel(response);
    },
  });
