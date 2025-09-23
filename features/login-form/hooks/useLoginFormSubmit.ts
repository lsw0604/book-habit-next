import { useCallback } from 'react';

import { useLogin, authEvents } from '@/entities/auth';
import type { User } from '@/entities/user/model';

import type { LoginType } from '../schemas';

export const useLoginFormSubmit = () => {
  const { mutate, isPending, isError, error } = useLogin();

  const onSuccess = useCallback((response: User) => {
    authEvents.emitLogin({ ...response });
  }, []);

  const onSubmit = useCallback(
    (data: LoginType) => {
      mutate({ ...data }, { onSuccess });
    },
    [mutate, onSuccess]
  );

  return {
    onSubmit,
    isPending,
    isError,
    error,
  };
};
