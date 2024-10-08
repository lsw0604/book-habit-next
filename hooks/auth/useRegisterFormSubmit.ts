'use client';

import { useAppDispatch } from '@/store';
import { userActions } from '@/store/features/user/user-action';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useSuccessHandler from '@/hooks/success/useSuccessHandler';
import useMutationRegister from '@/queries/auth/useMutationRegister';
import { RegisterSchemaType } from '@/schemas/register.schema';

interface RegisterFormSubmitProps {
  onSuccessCallback?: () => void;
}

export default function useRegisterFormSubmit({
  onSuccessCallback,
}: RegisterFormSubmitProps) {
  const dispatch = useAppDispatch();
  const { mutate, isSuccess, error, isPending, isError } =
    useMutationRegister();
  useSuccessHandler({ isSuccess, message: '회원가입에 성공했습니다.' });
  useErrorHandler(isError, error);

  const handleSuccess = (response: ResponseAuth) => {
    dispatch(userActions.setUserState({ ...response, isLogged: true }));
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  const onSubmit = (data: RegisterSchemaType) => {
    const { checkPassword: _, ...rest } = data;
    mutate(
      { ...rest },
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
