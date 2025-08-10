import { useCallback } from 'react';

import { useLogin } from '@/entities/auth/hooks';
import { type LoginType, authEvents } from '@/entities/auth/model';
import type { User } from '@/entities/user/model';

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
