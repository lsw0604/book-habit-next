import type { User } from '@/entities/user/model';
import { type RegisterType, authEvents } from '@/entities/auth/model';
import { useCallback } from 'react';
import { useRegister } from '@/entities/auth/hooks';

export const useRegisterFormSubmit = () => {
  const { mutate, isPending } = useRegister();

  const onSuccess = useCallback((response: User) => {
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
