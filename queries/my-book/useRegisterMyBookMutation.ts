import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { registerMyBookAPI } from '@/service/my-book';
import { queryKeys } from '@/constant/queries-key';

export default function useRegisterMyBookMutation(
  param: Pick<RequestRegisterMyBook, 'title'>
) {
  return useMutation<
    ResponseRegisterMyBook,
    AxiosError<NestServerErrorType>,
    RequestRegisterMyBook
  >({
    mutationFn: (payload: RequestRegisterMyBook) => registerMyBookAPI(payload),
    mutationKey: [queryKeys.myBook.register(param)],
  });
}
