'use client';

import { useCallback, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ErrorMessage from '@/components/common/error-message';
import { IconKakao } from '@/style/icon';

import useLoginHook from '@/hooks/auth/useLoginHook';
import useKakaoRouter from '@/hooks/auth/useKakaoRouter';
import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { LoginSchemaType } from '@/schemas/login.schema';

interface ControllerProps {
  control: Control<LoginSchemaType>;
}

export default function LoginForm() {
  const { pushToKakaoLogin } = useKakaoRouter();
  const { onSubmit, isPending } = useLoginHook();
  const { control, handleSubmit } = useLoginForm();

  return (
    <form
      className="flex flex-col ml-auto max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <LoginEmailController control={control} />
      <LoginPasswordController control={control} />
      <p className="text-sm mt-4">
        계정이 없나요?{' '}
        <span className="text-slate-300">
          <Link
            href="/register"
            className="font-bold text-slate-500 hover:underline"
          >
            회원가입
          </Link>
        </span>
        하러가기
      </p>
      <Separator className="my-4" />
      <Button role="primary" isLoading={isPending} type="submit">
        로그인하기
      </Button>
      <Button
        role="secondary"
        onClick={pushToKakaoLogin}
        type="button"
        variant="yellow"
        className="mt-4 bg-yellow-300 hover:bg-yellow-300"
      >
        <IconKakao className="w-5 h-5 mr-4 fill-yellow-300" />
        카카오로 로그인
      </Button>
    </form>
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
          {!!error && error.message && <ErrorMessage message={error.message} />}
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
          {!!error && error.message && <ErrorMessage message={error.message} />}
        </div>
      )}
    />
  );
};
