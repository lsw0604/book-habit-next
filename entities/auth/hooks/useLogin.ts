import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';

import { type LoginPayload, authService } from '../api';
import { type Auth, toAuthViewModel } from '../model';

export const useLogin = () =>
  useMutation<Auth, AxiosError<ErrorDTO>, LoginPayload>({
    mutationFn: async payload => {
      const response = await authService.login(payload);
      return toAuthViewModel(response);
    },
  });
