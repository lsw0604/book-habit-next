import { useCallback } from 'react';

import type { RegisterPayload } from '@/entities/auth/api';
import { useRegister } from '@/entities/auth/hooks';
import { authEvents } from '@/entities/auth/model';
import type { User } from '@/entities/user/model';

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
