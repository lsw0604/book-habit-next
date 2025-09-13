'use client';

import Link from 'next/link';

import { KakaoIcon } from '@/shared/assets';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';

import { useKakaoRouter } from '../hooks';

export function LoginButtons({ isLoading }: { isLoading: boolean }) {
  const { pushToKakaoLogin } = useKakaoRouter();
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
        disabled={isLoading}
      >
        로그인하기
      </Button>
      <Button
        key="kakao-login-router-btn"
        role="button"
        onClick={pushToKakaoLogin}
        type="button"
        isLoading={isLoading}
        disabled={isLoading}
        variant="yellow"
        className="mt-4 bg-yellow-300 hover:bg-yellow-300"
      >
        <KakaoIcon className="w-5 h-5 mr-4 fill-yellow-300" />
        카카오로 로그인
      </Button>
    </>
  );
}
