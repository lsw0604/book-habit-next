import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  deleteMyBookAPI,
  putMyBookDetailAPI,
  registerMyBookAPI,
} from '@/service/my-book';
import { useMyBookInvalidateCache } from '@/hooks/my-book/useMyBookInvalidateCache';
import { useMyBookUpdateCache } from '@/hooks/my-book/useMyBookUpdateCache';

export default function useMyBookMutation() {
  const { invalidateList, invalidateDetail } = useMyBookInvalidateCache();
  const { updateMyBookQueryData } = useMyBookUpdateCache();

  const addMyBook = () => {
    return useMutation<
      ResponseRegisterMyBook,
      AxiosError<NestServerErrorType>,
      RequestRegisterMyBook
    >({
      mutationFn: (payload: RequestRegisterMyBook) =>
        registerMyBookAPI(payload),
      onSuccess: () => {
        invalidateList();
      },
    });
  };

  const removeMyBook = () => {
    return useMutation<
      ResponseDeleteMyBook,
      AxiosError<NestServerErrorType>,
      RequestDeleteMyBook
    >({
      mutationFn: deleteMyBookAPI,
      onMutate: (payload) => {
        invalidateDetail(payload.myBookId);
      },
      onSuccess: () => {
        invalidateList();
      },
    });
  };

  const updateMyBook = () => {
    return useMutation<
      ResponsePutMyBookDetail,
      AxiosError<NestServerErrorType>,
      RequestPutMyBookDetail
    >({
      mutationFn: putMyBookDetailAPI,
      onSuccess: (response) => {
        invalidateList();
        updateMyBookQueryData(response);
      },
    });
  };

  return {
    addMyBook,
    removeMyBook,
    updateMyBook,
  };
}
