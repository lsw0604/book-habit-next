'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LoginKakaoButton from './login-kakao-button';

import { useLoginForm } from '@/hooks/auth/useLoginForm';
import { Controller } from 'react-hook-form';
import useLoginHook from '@/hooks/auth/useLoginHook';

export default function LoginForm() {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  const { onSubmit, isPending } = useLoginHook();
  const { control, handleSubmit } = useLoginForm();

  return (
    <form
      className="flex flex-col ml-auto max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative w-full mb-2">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              label="email"
              type="email"
              isValid={!!error}
              errorMessage={error?.message}
              icon={<MailIcon className="w-5 h-5" />}
              autoComplete="off"
              useValidation
            />
          )}
        />
      </div>
      <div className="relative w-full mb-2">
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              {...field}
              type={isEyeOpen ? 'text ' : 'password'}
              errorMessage={error?.message}
              isValid={!!error}
              icon={
                isEyeOpen ? (
                  <EyeIcon
                    className="w-5 h-5"
                    onClick={() => setIsEyeOpen((prev) => !prev)}
                  />
                ) : (
                  <EyeOffIcon
                    className="w-5 h-5"
                    onClick={() => setIsEyeOpen((prev) => !prev)}
                  />
                )
              }
              label="password"
              autoComplete="off"
              useValidation
            />
          )}
        />
      </div>
      <p className="text-sm mt-4">
        계정이 없나요?{' '}
        <span className="text-slate-500 font-bold">
          <Link href="/register">회원가입</Link>
        </span>
        하러가기
      </p>
      <Separator className="my-4" />
      <Button isLoading={isPending} type="submit">
        로그인하기
      </Button>
      <LoginKakaoButton />
    </form>
  );
}
