import { useMutation } from '@tanstack/react-query';

import { APIError } from '@/shared/api/errors';
import { toUserViewModel, userEvents, type User } from '@/entities/user';

import { loginService } from '../api';
import type { LoginType } from '../model';

export const useLogin = () =>
  useMutation<User, APIError, LoginType>({
    mutationFn: async (payload) => {
      const response = await loginService.login(payload);
      const { user } = response;
      return toUserViewModel(user);
    },
    onSuccess: (response) => {
      userEvents.emitLogin(response);
    },
  });
