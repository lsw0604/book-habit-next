'use client';

import {
  KAKAO_AUTH_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
} from '@/constant/kakao-env';
import { useCallback } from 'react';

function getKakaoAuthUrl() {
  if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
    throw new Error('KAKAO_CLIENT_ID or KAKAO_REDIRECT_URI is not defined');
  }

  const params = new URLSearchParams({
    client_id: KAKAO_CLIENT_ID,
    redirect_uri: KAKAO_REDIRECT_URI,
    response_type: 'code',
  });
  return `${KAKAO_AUTH_URL}?${params.toString()}`;
}

export default function useKakaoRouter() {
  const pushToKakaoLogin = useCallback(() => {
    window.location.href = getKakaoAuthUrl();
  }, []);

  return {
    pushToKakaoLogin,
  };
}
