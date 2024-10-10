import { useEffect } from 'react';

import { useAppDispatch } from '@/store';
import { userActions } from '@/store/features/user/user-action';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useQueryKakao from '@/queries/auth/useQueryKakao';

interface UseKakaoProps {
  code: string;
  onSuccessCallback?: () => void;
}

export default function useKakaoHook({
  code,
  onSuccessCallback,
}: UseKakaoProps) {
  const dispatch = useAppDispatch();
  const { data, isSuccess, isLoading, refetch, isError, error } =
    useQueryKakao(code);

  useEffect(() => {
    if (isSuccess) {
      dispatch(userActions.setUserState({ ...data, isLogged: true }));
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    }
  }, [isSuccess, data, dispatch]);
  useErrorHandler(isError, error);

  const onRefetch = () => {
    refetch();
  };

  return {
    isLoading,
    onRefetch,
    isError,
  };
}
