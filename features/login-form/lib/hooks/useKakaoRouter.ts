import {
  KAKAO_AUTH_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
} from '@/entities/auth/lib/constant';
import { useCallback } from 'react';

export const useKakaoRouter = () => {
  if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI)
    throw new Error('KAKAO_CLIENT_ID or KAKAO_REDIRECT_URI is not defined');

  const params = new URLSearchParams();
  params.append('client_id', KAKAO_CLIENT_ID);
  params.append('redirect_uri', KAKAO_REDIRECT_URI);
  params.append('response_type', 'code');

  const pushToKakaoLogin = useCallback(() => {
    window.location.href = `${KAKAO_AUTH_URL}?${params.toString()}`;
  }, []);

  return {
    pushToKakaoLogin,
  };
};
