import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@/hooks/useToastHook';
import { loginAPI } from 'lib/api/auth';
import { useAppDispatch } from 'store';
import { userActions } from 'store/user';
import { queriesKey } from 'queries';

const { useLocalLoginMutationKey } = queriesKey.local;

export default function useLocalLoginMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();
  const { isLoading, data, mutate, isSuccess, isError, error } = useMutation<
    LocalLoginMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    LocalLoginMutationRequestType
  >([useLocalLoginMutationKey], loginAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status, access_jwt, ...rest } = data;
      window.localStorage.setItem('ACCESS', access_jwt);
      dispatch(userActions.setUserState({ ...rest, isLogged: true }));

      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.status === 403) {
      const message = error.response.data.message;
      const status = error.response.data.status;

      addToast({ message, status });
    }
  }, [isError, error]);

  return { isLoading, data, mutate, isError, error, isSuccess };
}
