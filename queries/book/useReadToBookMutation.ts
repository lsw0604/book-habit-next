import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@/hooks/useToastHook';
import { readToBookRegisterAPI } from '@/lib/api/book';
import { queriesKey, queryClient } from 'queries';
import { useAppDispatch } from '@/app/store';
import { modalActions } from '@/app/store/modal';
import { bookRegisterActions } from '@/app/store/bookRegister';

const { book, myBook } = queriesKey;

export default function useReadToBookMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    useReadToBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    useReadToBookMutationRequestType
  >([book.useReadToBookMutationKey], readToBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '전체보기'],
      });

      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '읽고싶음'],
      });
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });

      dispatch(bookRegisterActions.setBookRegisterInitialState());
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
