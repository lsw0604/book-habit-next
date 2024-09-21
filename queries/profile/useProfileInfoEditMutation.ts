import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import useToastHook from '@/hooks/toast/useToastHook';
import { profileInfoUpdateAPI } from 'lib/api/auth';
import { queriesKey } from 'queries';
import { useAppDispatch } from '@/app/store';
import { modalActions } from '@/app/store/modal';
import { userActions } from '@/app/store/user';

const { useProfileInfoEditMutationKey } = queriesKey.profile;

export default function useProfileInfoEditMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { mutate, isLoading, isError, isSuccess, data, error } = useMutation<
    ProfileInfoEditMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ProfileInfoEditMutationRequestType
  >([useProfileInfoEditMutationKey], profileInfoUpdateAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status, name, age, gender } = data;

      addToast({ message, status });
      dispatch(userActions.setUserName(name));
      dispatch(userActions.setUserAge(age));
      dispatch(userActions.setUserGender(gender));
      dispatch(modalActions.setModalClose());
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
