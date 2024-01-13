import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { v4 } from 'uuid';
import { AxiosError } from 'axios';

import useToastHook from '@/hooks/useToastHook';
import { queriesKey } from 'queries';
import { bookRegisterAPI } from '@/lib/api/book';
import { useAppDispatch } from 'store';
import { modalActions } from 'store/modal';
import { searchBookRegisterActions } from 'store/searchBookRegister';

const { useBookRegisterMutationKey } = queriesKey.book;

export default function useBookRegisterMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { mutate, data, isError, error, isLoading, isSuccess } = useMutation<
    BookRegisterResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    BookRegisterType
  >([useBookRegisterMutationKey, v4()], bookRegisterAPI);

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
      dispatch(modalActions.setModalClose());
      dispatch(searchBookRegisterActions.setSearchBookInitialState());
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return { mutate, isLoading };
}
