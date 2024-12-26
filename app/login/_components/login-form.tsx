'use client';

import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react';
import { AxiosError } from 'axios';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ErrorMessage } from '@/components/common/error-message';
import { useAppDispatch } from '@/store';
import { userActions } from '@/store/features/user/user-action';
import { useAuthMutation } from '@/service/auth/useAuthService';
import useLoginRouter from '@/hooks/auth/useLoginRouter';
import useKakaoRouter from '@/hooks/auth/useKakaoRouter';
import useLoginForm from '@/hooks/form/auth/useLoginForm';
import { LoginSchemaType } from '@/hooks/form/auth/schema/login.schema';
import { IconKakao } from '@/style/icon';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { onSuccessCallback } = useLoginRouter();

  const {
    login: { mutate, isPending, isError, error },
  } = useAuthMutation();

  const handleSuccess = useCallback(
    async (response: ResponseAuth) => {
      await Promise.all([
        dispatch(userActions.setUserState({ ...response, isLogged: true })),
        onSuccessCallback(),
      ]);
    },
    [dispatch, onSuccessCallback]
  );

  const onSubmit = useCallback(
    (data: LoginSchemaType) => {
      mutate(
        { ...data },
        {
          onSuccess: handleSuccess,
        }
      );
    },
    [handleSuccess, mutate]
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useLoginForm();

  const isLoading = isSubmitting || isPending;

  return (
    <form
      className="flex flex-col ml-auto max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormUI control={control} isError={isError} error={error} />
      <FormActions />
      <Separator className="my-4" />
      <FormButtons isLoading={isLoading} />
    </form>
  );
}

function FormButtons({ isLoading }: { isLoading: boolean }) {
  const { pushToKakaoLogin } = useKakaoRouter();
  return (
    <>
      <Button
        type="submit"
        role="primary"
        isLoading={isLoading}
        disabled={isLoading}
      >
        로그인하기
      </Button>
      <Button
        role="secondary"
        onClick={pushToKakaoLogin}
        type="button"
        isLoading={isLoading}
        disabled={isLoading}
        variant="yellow"
        className="mt-4 bg-yellow-300 hover:bg-yellow-300"
      >
        <IconKakao className="w-5 h-5 mr-4 fill-yellow-300" />
        카카오로 로그인
      </Button>
    </>
  );
}

interface ControllerProps {
  control: Control<LoginSchemaType>;
  isError?: boolean;
  error?: AxiosError<NestServerErrorType, any> | null;
}

function FormUI({ control, isError, error }: ControllerProps) {
  return (
    <>
      <LoginEmailController control={control} />
      <LoginPasswordController control={control} />
      {isError && error?.response && error?.response?.data.message && (
        <ErrorMessage>{error?.response.data.message}</ErrorMessage>
      )}
    </>
  );
}

function FormActions() {
  return (
    <>
      <p className="text-sm mt-4">
        계정이 없나요?{' '}
        <span className="text-slate-300">
          <Link
            href="/register"
            className="font-bold text-slate-500 hover:underline"
            prefetch
          >
            회원가입
          </Link>
        </span>
        하러가기
      </p>
    </>
  );
}

const LoginEmailController = ({ control }: ControllerProps) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full mb-2">
          <Label className="mb-2 ml-2 text-sm font-bold">이메일</Label>
          <Input
            {...field}
            type="email"
            icon={<MailIcon className="w-5 h-5" />}
            autoComplete="off"
          />
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

const LoginPasswordController = ({ control }: ControllerProps) => {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  const onClick = useCallback(() => {
    setIsEyeOpen((prev) => !prev);
  }, []);
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative w-full mb-2">
          <Label className="mb-2 ml-2 text-sm font-bold">비밀번호</Label>
          <Input
            {...field}
            type={isEyeOpen ? 'text ' : 'password'}
            icon={
              isEyeOpen ? (
                <EyeIcon className="w-5 h-5" onClick={onClick} />
              ) : (
                <EyeOffIcon className="w-5 h-5" onClick={onClick} />
              )
            }
            autoComplete="off"
          />
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
