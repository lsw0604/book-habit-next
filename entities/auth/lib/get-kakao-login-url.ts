import {
  KAKAO_AUTH_URL,
  KAKAO_CLIENT_ID,
  KAKAO_REDIRECT_URI,
} from '../constant';

// 이 로직은 서버에서도, 클라이언트에서도 실행될 수 있는 순수 함수입니다.
export const getKakaoLoginUrl = (state?: string | null) => {
  if (!KAKAO_CLIENT_ID || !KAKAO_REDIRECT_URI) {
    throw new Error('KAKAO_CLIENT_ID or KAKAO_REDIRECT_URI is not defined');
  }

  const params = new URLSearchParams();
  params.append('client_id', KAKAO_CLIENT_ID);
  params.append('redirect_uri', KAKAO_REDIRECT_URI);
  params.append('response_type', 'code');

  if (state) {
    params.append('state', state);
  }

  return `${KAKAO_AUTH_URL}?${params.toString()}`;
};
