import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/store';
import { userActions } from '@/store/features/user/user-action';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useQueryKakao from '@/queries/auth/useQueryKakao';

export default function useKakaoHook(code: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data, isSuccess, isLoading, refetch, isError, error } =
    useQueryKakao(code);

  useEffect(() => {
    if (isSuccess) {
      dispatch(userActions.setUserState({ ...data, isLogged: true }));
      router.push('/search');
    }
  }, [isSuccess, data, dispatch, router]);

  useErrorHandler(isError, error);

  return {
    isLoading,
    refetch,
    isError,
  };
}
