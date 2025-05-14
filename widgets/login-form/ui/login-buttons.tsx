import Link from 'next/link';
import { useKakaoRouter } from '@/features/login-form/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { IconKakao } from '@/style/icon';

export default function LoginButtons({ isLoading }: { isLoading: boolean }) {
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
        type="submit"
        role="primary"
        isLoading={isLoading}
        disabled={isLoading}
      >
        로그인하기
      </Button>
      <Button
        role="secondary"
        onClick={pushToKakaoLogin}
        type="button"
        isLoading={isLoading}
        disabled={isLoading}
        variant="yellow"
        className="mt-4 bg-yellow-300 hover:bg-yellow-300"
      >
        <IconKakao className="w-5 h-5 mr-4 fill-yellow-300" />
        카카오로 로그인
      </Button>
    </>
  );
}
