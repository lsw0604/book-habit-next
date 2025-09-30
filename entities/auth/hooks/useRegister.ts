import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';

import { type RegisterPayload, authService } from '../api';
import { type Auth, toAuthViewModel } from '../model';

export const useRegister = () =>
  useMutation<Auth, AxiosError<ErrorDTO>, RegisterPayload>({
    mutationFn: async payload => {
      const response = await authService.register(payload);
      return toAuthViewModel(response);
    },
  });
