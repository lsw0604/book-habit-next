import { useCallback } from 'react';

import {
  KAKAO_AUTH_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
} from '@/entities/auth/constant';

// 런타임에 변하지 않는 상수들이므로, 애플리케이션 로드 시점에 미리 확인합니다.
if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI)
  throw new Error('KAKAO_CLIENT_ID or KAKAO_REDIRECT_URI is not defined');

const params = new URLSearchParams();

params.append('client_id', KAKAO_CLIENT_ID);
params.append('redirect_uri', KAKAO_REDIRECT_URI);
params.append('response_type', 'code');

const KAKAO_LOGIN_URL = `${KAKAO_AUTH_URL}?${params.toString()}`;

export const useKakaoRouter = () => {
  const pushToKakaoLogin = useCallback(() => {
    window.location.href = KAKAO_LOGIN_URL;
  }, []);

  return {
    pushToKakaoLogin,
  };
};
