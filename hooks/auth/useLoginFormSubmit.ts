'use client';

import { useAppDispatch } from '@/store';
import { userActions } from '@/store/features/user/user-action';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useSuccessHandler from '@/hooks/success/useSuccessHandler';
import useMutationLogin from '@/queries/auth/useMutationLogin';
import { LoginSchemaType } from '@/schemas/login.schema';

interface LoginFormSubmitProps {
  onSuccessCallback?: () => void;
}

export default function useLoginFormSubmit({
  onSuccessCallback,
}: LoginFormSubmitProps) {
  const dispatch = useAppDispatch();
  const { mutate, isSuccess, isError, error, isPending } = useMutationLogin();

  const handleSuccess = (response: ResponseAuth) => {
    dispatch(userActions.setUserState({ isLogged: true, ...response }));
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };
  useSuccessHandler({ isSuccess, message: '로그인에 성공했습니다.' });
  useErrorHandler(isError, error);

  const onSubmit = (data: LoginSchemaType) => {
    mutate(
      { ...data },
      {
        onSuccess: handleSuccess,
      }
    );
  };

  return {
    onSubmit,
    isPending,
  };
}
