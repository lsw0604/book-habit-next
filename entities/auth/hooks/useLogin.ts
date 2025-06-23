import type { ErrorResponseDTO } from '@/shared/api/types/error';
import type { AxiosError } from 'axios';
import { type LoginPayload, authService } from '../api';
import { useMutation } from '@tanstack/react-query';
import { toUserViewModel } from '@/entities/user/lib';
import { User } from '@/entities/user/model';

export const useLogin = () => {
  return useMutation<User, AxiosError<ErrorResponseDTO>, LoginPayload>({
    mutationFn: async payload => {
      const response = await authService.login(payload);
      return toUserViewModel(response);
    },
  });
};
