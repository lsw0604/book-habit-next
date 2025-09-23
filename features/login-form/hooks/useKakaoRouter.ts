'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { getKakaoLoginUrl } from '@/entities/auth/lib';

export const useKakaoRouter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const pushToKakaoLogin = useCallback(() => {
    const KAKAO_LOGIN_URL = getKakaoLoginUrl(redirectTo);
    router.push(KAKAO_LOGIN_URL);
  }, [redirectTo, router]);

  return {
    pushToKakaoLogin,
  };
};
