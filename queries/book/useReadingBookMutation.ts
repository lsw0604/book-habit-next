import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import useToastHook from '@/hooks/useToastHook';
import { readingBookRegisterAPI } from '@/lib/api/book';
import { useAppDispatch } from 'store';
import { modalActions } from 'store/modal';
import { bookRegisterActions } from 'store/bookRegister';
import { queriesKey, queryClient } from 'queries';

const { book, myBook } = queriesKey;

export default function useReadingBookMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { mutate, isLoading, isSuccess, data, isError, error } = useMutation<
    ReadingBookMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    ReadingBookMutationRequestType
  >([book.useReadingBookMutationKey], readingBookRegisterAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '전체보기'],
      });
      queryClient.invalidateQueries({
        queryKey: [myBook.useMyBookListInfinityQueryKey, '읽는중'],
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
