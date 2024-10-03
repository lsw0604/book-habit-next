import { putMyBookDetailAPI, registerMyBookAPI } from '@/service/my-book';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useMyBookMutation() {
  const addMyBook = () => {
    return useMutation<
      ResponseRegisterMyBook,
      AxiosError<NestServerErrorType>,
      RequestRegisterMyBook
    >({
      mutationFn: (payload: RequestRegisterMyBook) =>
        registerMyBookAPI(payload),
    });
  };

  const removeMyBook = () => {};

  const updateMyBook = () => {
    return useMutation<
      ResponsePutMyBookDetail,
      AxiosError<NestServerErrorType>,
      RequestPutMyBookDetail
    >({
      mutationFn: putMyBookDetailAPI,
    });
  };

  return {
    addMyBook,
    removeMyBook,
    updateMyBook,
  };
}
