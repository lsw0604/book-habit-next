import { useCallback } from 'react';

import { useLogin, authEvents, type Auth } from '@/entities/auth';

import type { LoginType } from '../schemas';

export const useLoginFormSubmit = () => {
  const { mutate, isPending, isError, error } = useLogin();

  const onSuccess = useCallback((response: Auth) => {
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
