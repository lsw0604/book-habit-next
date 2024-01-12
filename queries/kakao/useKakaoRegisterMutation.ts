import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { kakaoSignupAPI } from 'lib/api/auth';
import useToastHook from '@/hooks/useToastHook';
import { queriesKey } from 'queries';
import { useAppDispatch } from '@/app/store';
import { userActions } from '@/app/store/user';

const { useKakaoRegisterMutationKey } = queriesKey.kakao;

export default function useKakaoRegisterMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { isLoading, mutate, data, isSuccess, isError, error } = useMutation<
    KakaoSignUpMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    KakaoSignUpMutationRequestType
  >([useKakaoRegisterMutationKey], kakaoSignupAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;

      addToast({ message, status });
      dispatch(userActions.setUserState({ ...data, isLogged: true }));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response?.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return { isLoading, mutate, data, isSuccess, isError, error };
}
