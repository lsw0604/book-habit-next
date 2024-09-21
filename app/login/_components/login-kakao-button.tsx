'use client';

import { IconKakao } from '@/style/icon';
import { Button } from '@/components/ui/button';

const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function LoginKakaoButton() {
  const kakaoPageHandler = () => {
    window.location.href = URL;
  };
  return (
    <Button
      variant="yellow"
      className="mt-4 bg-yellow-300 hover:bg-yellow-300"
      type="button"
      onClick={kakaoPageHandler}
    >
      <IconKakao className="w-5 h-5 mr-4" />
      카카오로 로그인하기
    </Button>
  );
}
