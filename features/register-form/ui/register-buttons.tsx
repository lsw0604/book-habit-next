import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';

export function RegisterButtons({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <p className="text-sm mt-4">
        이미 계정이 있나요?{' '}
        <span className="text-slate-300">
          <Link
            href="/register"
            className="font-bold text-slate-500 hover:underline"
            prefetch
          >
            로그인
          </Link>
        </span>
        하러가기
      </p>
      <Separator className="my-4" />
      <Button isLoading={isLoading} type="submit">
        회원가입
      </Button>
    </>
  );
}
