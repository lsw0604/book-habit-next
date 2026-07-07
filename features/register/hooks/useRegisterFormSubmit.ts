'use client'

import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  User,
  userEvents,
} from '@/entities/user';
import { useRegister } from '../hooks';

import type { RegisterType } from '../model';

export const useRegisterFormSubmit = () => {
  const { mutate, isPending } = useRegister();
  const { setError } = useFormContext<RegisterType>();

  const onSuccess = useCallback((response: User) => {
    userEvents.emitRegister({ ...response });
  }, []);

  const onSubmit = useCallback(
    (data: RegisterType) => {
      const { checkPassword, ...apiPayload } = data;
      mutate(apiPayload, {
        onSuccess,
        onError: (error) => {
          if (error.statusCode === 409) {
            setError('email', {
              type: 'server',
              message: error.message,
            });
          } else {
            setError('root', {
              type: 'server',
              message: error.message || '회원가입에 실패했습니다.',
            });
          }
        },
      });
    },
    [mutate, onSuccess, setError]
  );

  return {
    onSubmit,
    isPending,
  };
};
