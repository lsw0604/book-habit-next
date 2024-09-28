'use client';

import { useEffect } from 'react';

import { useAppDispatch } from '@/store';
import useToastHook from '@/hooks/toast/useToastHook';
import { setUserState } from '@/store/features/user/user-slice';
import useMutationLogin from '@/queries/auth/useMutationLogin';
import { LoginSchemaType } from '@/schemas/login.schema';

export default function useLoginHook() {
  const dispatch = useAppDispatch();
  const { successToast, errorToast } = useToastHook();
  const { mutate, isSuccess, data, isError, error, isPending } =
    useMutationLogin();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserState({ ...data, isLogged: true }));
      successToast('로그인에 성공했습니다.');
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      errorToast(error.message);
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
