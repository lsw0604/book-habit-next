'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { userQueryKeys } from '@/entities/user';
import { useKakao } from '@/features/login';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';

export default function KakaoLoginPage({
  searchParams: { code, state },
}: {
  searchParams: { code: string; state: string };
}) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isSuccess, isLoading, refetch, isError } = useKakao(code);

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.access.queryKey,
      });
      router.push(state || '/search');
    }
  }, [isSuccess, queryClient, router, state]);

  if (!code) {
    return (
      <div className="flex flex-col items-center p-1 pb-4 rounded-lg border border-gray-300 shadow-md">
        {/* TODO Alert Component */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* TODO LogoSad 추가 */}
          <div className="flex items-center justify-around gap-4 w-full">
            <Link href="/login" className="text-sm text-gray-500 font-semibold">
              로그인 페이지로 가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="flex w-full flex-1 items-center justify-center px-4">
      {isLoading && (
        <div className="flex flex-col items-center p-1 pb-4 rounded-lg border border-gray-300 shadow-md">
          {/* TODO Alert Component */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* TODO LogoMain 추가  */}
            <div className="flex items-center justify-around gap-4 w-full">
              <Spinner />
            </div>
          </div>
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center p-1 pb-4 rounded-lg border border-gray-300 shadow-md">
          {/* TODO Alert Component */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* TODO LogoSad 추가 */}
            <div className="flex items-center justify-around gap-4 w-full">
              <Link
                href="/login"
                className="text-sm text-gray-500 font-semibold"
              >
                로그인 페이지로 가기
              </Link>
              <Button type="button" onClick={() => refetch()}>
                다시 시도하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
