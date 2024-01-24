'use client';

import { useState } from 'react';
import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, MailIcon } from 'lucide-react';
import { useUpdateEffect } from 'usehooks-ts';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LoginKakaoButton from './login-kakao-button';

import useLocalLoginMutation from '@/queries/local/useLocalLoginMutation';

const schema = z.object({
  email: z.string().min(1, {
    message: 'email을 입력해주세요.',
  }),
  password: z.string().min(1, {
    message: 'password를 입력해주세요.',
  }),
});

type InputType = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitted },
  } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  const [useValidation, setIsUseValidation] = useState<boolean>(false);

  const { isLoading, mutate } = useLocalLoginMutation();

  const onSubmit = (data: InputType) => mutate(data);

  useUpdateEffect(() => {
    if (isSubmitted) {
      setIsUseValidation(true);
    }
  }, [isSubmitted]);

  return (
    <form
      className="flex flex-col ml-auto max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative w-full mb-2">
        <Input
          errorMessage={errors.email?.message}
          isValid={!isValid}
          useValidation={useValidation}
          label="email"
          type="email"
          icon={<MailIcon className="w-5 h-5" />}
          {...register('email')}
        />
      </div>
      <div className="relative w-full mb-2">
        <Input
          errorMessage={errors.password?.message}
          isValid={!isValid}
          useValidation={useValidation}
          type={isEyeOpen ? 'text ' : 'password'}
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
          autoComplete="on"
          {...register('password')}
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
      <Button isLoading={isLoading} type="submit">
        로그인하기
      </Button>
      <LoginKakaoButton />
    </form>
  );
}
