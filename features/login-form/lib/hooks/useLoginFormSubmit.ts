import { useAuthMutations } from '@/entities/auth/lib/query';
import { useCallback } from 'react';
import { LoginType } from '../../model/schema';
import { ResponseAuth } from '@/entities/auth/api/types';
import { authEvents } from '@/entities/auth/model/auth-events';

export const useLoginFormSubmit = () => {
  const {
    login: { mutate, isPending, isError, error },
  } = useAuthMutations();

  const onSuccess = useCallback((response: ResponseAuth) => {
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
