import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@/hooks/useToastHook';
import { myBookCommentUpdateAPI } from 'lib/api/myBook';
import { queriesKey, queryClient } from 'queries';
import { useAppDispatch } from 'store';
import { modalActions } from 'store/modal';
import { myBookActions } from 'store/myBook';

const { useMyBookCommentUpdateMutationKey, useMyBookCommentListQueryKey } =
  queriesKey.myBook;

export default function useMyBookCommentUpdateMutation() {
  const dispatch = useAppDispatch();
  const { addToast } = useToastHook();

  const { mutate, isLoading, data, isSuccess, isError, error } = useMutation<
    MyBookCommentUpdateMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookCommentUpdateMutationRequestType
  >([useMyBookCommentUpdateMutationKey], myBookCommentUpdateAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries([useMyBookCommentListQueryKey]);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;

      addToast({ message, status });
      dispatch(modalActions.setModalClose());
      dispatch(myBookActions.setInitialState());
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
