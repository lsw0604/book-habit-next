import { ResponseAuth } from '@/entities/auth/api/types';
import { useAuthMutations } from '@/entities/auth/lib/query';
import { authEvents } from '@/entities/auth/model/auth-events';
import { useCallback } from 'react';
import { RegisterType } from '../../model/schema';

export const useRegisterFormSubmit = () => {
  const {
    register: { mutate, isPending },
  } = useAuthMutations();

  const onSuccess = useCallback((response: ResponseAuth) => {
    authEvents.emitRegister({ ...response });
  }, []);

  const onSubmit = useCallback(
    (data: RegisterType) => {
      const { checkPassword: _, ...payload } = data;
      mutate({ ...payload }, { onSuccess });
    },
    [mutate, onSuccess]
  );

  return {
    onSubmit,
    isPending,
  };
};
