import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { toUserViewModel } from '@/entities/user/lib';
import type { User } from '@/entities/user/model';
import type { ErrorResponseDTO } from '@/shared/api/types/error';

import { type RegisterPayload, authService } from '../api';

export const useRegister = () =>
  useMutation<User, AxiosError<ErrorResponseDTO>, RegisterPayload>({
    mutationFn: async payload => {
      const response = await authService.register(payload);
      return toUserViewModel(response);
    },
  });
