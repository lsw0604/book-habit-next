import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { toUserViewModel } from '@/entities/user/lib';
import { User } from '@/entities/user/model';
import type { ErrorResponseDTO } from '@/shared/api/types/error';

import { type LoginPayload, authService } from '../api';

export const useLogin = () =>
  useMutation<User, AxiosError<ErrorResponseDTO>, LoginPayload>({
    mutationFn: async payload => {
      const response = await authService.login(payload);
      return toUserViewModel(response);
    },
  });
