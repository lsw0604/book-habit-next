import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { registerMyBookAPI } from '@/service/my-book';

export default function useMutationCreateMyBook() {
  return useMutation<
    ResponseRegisterMyBook,
    AxiosError<NestServerErrorType>,
    RequestRegisterMyBook
  >({
    mutationFn: (payload: RequestRegisterMyBook) => registerMyBookAPI(payload),
  });
}
