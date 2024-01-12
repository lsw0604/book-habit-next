import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@/hooks/useToastHook';
import { profileUpdateAPI } from '@/lib/api/auth';
import { queriesKey } from 'queries';
import { useAppDispatch } from '@/app/store';
import { userActions } from '@/app/store/user';

const { useProfileEditMutationKey } = queriesKey.profile;

export default function useProfileEditMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    ProfileEditMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ProfileEditMutationRequestType
  >([useProfileEditMutationKey], profileUpdateAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status, profile } = data;
      addToast({ message, status });
      dispatch(userActions.setUserProfile(profile));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
  };
}
