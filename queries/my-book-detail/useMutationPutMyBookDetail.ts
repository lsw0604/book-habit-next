import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { putMyBookDetailAPI } from '@/service/my-book';
import { queryKeys } from '@/constant/queries-key';
import { queryClient } from '@/queries';

export default function useMutationPutMyBookDetail(
  params: RequestPutMyBookDetail
) {
  return useMutation<
    ResponsePutMyBookDetail,
    AxiosError<NestServerErrorType>,
    RequestPutMyBookDetail
  >({
    mutationKey: [queryKeys.myBookDetail.putDetail(params)],
    mutationFn: putMyBookDetailAPI,
    onSuccess: (response) => {
      const myBookDetailData = queryClient.getQueryData([
        queryKeys.myBookDetail.getDetail(params.myBookId),
      ]);
      if (myBookDetailData) {
        queryClient.setQueryData(
          [queryKeys.myBookDetail.getDetail(params.myBookId)],
          response
        );
      } else {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.myBookDetail.getDetail(params.myBookId)],
        });
      }
      queryClient.invalidateQueries({
        queryKey: [queryKeys.myBook.getList({ order: 'desc', status: 'ALL' })],
      });
    },
  });
}
