import { useMutation } from '@tanstack/react-query';

import { APIError } from '@/shared/api/errors';

import type { RegisterType } from '../model';
import { registerService } from '../api';
import { type User, toUserViewModel, userEvents } from '@/entities/user';

export const useRegister = () =>
  useMutation<User, APIError, Omit<RegisterType, 'checkPassword'>>({
    mutationFn: async payload => {
      const response = await registerService.register(payload);
      const { user } = response;
      return toUserViewModel(user);
    },
    onSuccess: (response) => {
      userEvents.emitRegister(response)
    }
  });
