import { useCallback } from 'react';

import { type RegisterPayload, useRegister, authEvents } from '@/entities/auth';
import type { User } from '@/entities/user';

import type { RegisterType } from '../schemas';

export const useRegisterFormSubmit = () => {
  const { mutate, isPending } = useRegister();

  const onSuccess = useCallback((response: User) => {
    authEvents.emitRegister({ ...response });
  }, []);

  const onSubmit = useCallback(
    (data: RegisterType) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
      const { checkPassword: _, ...payload } = data;

      mutate({ ...(payload as RegisterPayload) }, { onSuccess });
    },
    [mutate, onSuccess]
  );

  return {
    onSubmit,
    isPending,
  };
};
