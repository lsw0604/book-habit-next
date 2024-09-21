'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/store';
import useToastHook from '@/hooks/toast/useToastHook';
import { setUserState } from '@/store/features/user/user-slice';
import useMutationLogin from '@/queries/auth/useMutationLogin';
import { LoginSchemaType } from '@/schemas/login.schema';

export default function useLoginHook() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();
  const { mutate, isSuccess, data, isError, error, isPending } =
    useMutationLogin();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserState({ ...data, isLogged: true }));
      addToast({ message: '로그인에 성공했습니다.', status: 'success' });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      addToast({ message: error.message, status: 'error' });
    }
  }, [isError, error]);

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return {
    onSubmit,
    isPending,
  };
}
