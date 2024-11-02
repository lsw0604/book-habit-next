'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import Alert from '@/components/common/alert';
import Loader from '@/components/common/loader';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store';
import { userActions } from '@/store/features/user/user-action';
import { useKakao } from '@/service/auth/useAuthService';
import useLoginRouter from '@/hooks/auth/useLoginRouter';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import { LogoMain, LogoSad } from '@/style/icon';

export default function KakaoLoginPage({
  searchParams: { code },
}: {
  searchParams: { code: string };
}) {
  const dispatch = useAppDispatch();
  const { onSuccessCallback } = useLoginRouter();
  if (!code) {
    throw new Error('code가 없습니다.');
  }
  const { data, isSuccess, isLoading, refetch, isError, error } =
    useKakao(code);

  useEffect(() => {
    if (isSuccess) {
      dispatch(userActions.setUserState({ ...data, isLogged: true }));
      onSuccessCallback();
    }
  }, [isSuccess, data, dispatch]);
  useErrorHandler(isError, error);

  return (
    <section className="w-full h-screen px-4 flex justify-center items-center">
      {isLoading && (
        <div className="flex flex-col items-center p-1 pb-4 rounded-lg border border-gray-300 shadow-md">
          <Alert message="카카오 로그인중입니다." status="INFO" />
          <div className="flex flex-col items-center gap-4 w-full">
            <LogoMain className="w-1/2 h-1/2" />
            <div className="flex items-center justify-around gap-4 w-full">
              <Loader size={2} className="border-black" />
            </div>
          </div>
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center p-1 pb-4 rounded-lg border border-gray-300 shadow-md">
          <Alert
            message="카카오 로그인에 오류가 발생했습니다."
            status="ERROR"
          />
          <div className="flex flex-col items-center gap-4 w-full">
            <LogoSad className="w-1/2 h-1/2" />
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
