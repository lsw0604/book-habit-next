import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { putMyBookDetailAPI } from '@/service/my-book';

/**
 * TODO Query 다시 작성하기
 */
export default function useMutationPutMyBookDetail() {
  return useMutation<
    ResponsePutMyBookDetail,
    AxiosError<NestServerErrorType>,
    RequestPutMyBookDetail
  >({
    mutationFn: putMyBookDetailAPI,
  });
}
