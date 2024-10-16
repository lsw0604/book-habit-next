import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constant/queries-key';
import { getMyBookCommentListAPI } from '@/service/my-book-comment';

export default function useMyBookCommentQuery(
  payload: RequestMyBookCommentList
) {
  return useQuery<
    ResponseGetMyBookCommentList,
    AxiosError<NestServerErrorType>,
    MyBookCommentItemType[]
  >({
    queryKey: [queryKeys.myBookComment.getList(payload)],
    queryFn: () => getMyBookCommentListAPI(payload),
    select: (data: ResponseGetMyBookCommentList): MyBookCommentItemType[] =>
      data.myBookCommentList,
    gcTime: 30 * 60 * 1000, // 30분
    staleTime: 10 * 60 * 1000, // 10분
  });
}
