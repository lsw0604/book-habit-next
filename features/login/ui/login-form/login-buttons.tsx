'use client';

import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';

import { KakaoLoginButton } from '../kakao-login-button';

export function LoginButtons({ isLoading }: { isLoading: boolean }) {
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
      <Separator className="my-4" />
      <Button
        key="login-submit-btn"
        type="submit"
        role="button"
        isLoading={isLoading}
      >
        로그인하기
      </Button>
      <KakaoLoginButton isLoading={isLoading} />
    </>
  );
}
