import { KakaoIcon } from '@/shared/assets';
import { Button } from '@/shared/ui/button';

import { useKakaoRouter } from '../../hooks';

export const KakaoLoginButton = ({ isLoading }: { isLoading: boolean }) => {
  const { pushToKakaoLogin } = useKakaoRouter();

  return (
    <Button
      key="kakao-login-router-btn"
      role="button"
      onClick={pushToKakaoLogin}
      type="button"
      isLoading={isLoading}
      variant="yellow"
      className="mt-4 bg-yellow-300 hover:bg-yellow-300"
    >
      <KakaoIcon className="w-5 h-5 mr-4 fill-yellow-300" />
      카카오로 로그인
    </Button>
  );
}