import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import { kakaoCallbackAPI } from 'lib/api/auth';
import useToastHook from '@/hooks/toast/useToastHook';
import { queriesKey, queryClient } from 'queries';
import { useAppDispatch } from '@/app/store';
import { userActions } from '@/app/store/user';

const { useKakaoCallbackQueryKey } = queriesKey.kakao;

export default function useKakaoCallbackQuery(code: string) {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { isLoading, data, isSuccess, isError, error, refetch } = useQuery<
    KakaoCallbackQueryResponseType,
    AxiosError<{ status: StatusType; message: string }>
  >([useKakaoCallbackQueryKey], () => kakaoCallbackAPI(code), {
    onError: () => {
      queryClient.refetchQueries([useKakaoCallbackQueryKey]);
    },
    retry: 0,
    enabled: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status, access_jwt } = data;
      window.localStorage.setItem('ACCESS', access_jwt);
      dispatch(userActions.setUserInitialState());
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    isSuccess,
    isError,
    error,
    isLoading,
    data,
    refetch,
  };
}
