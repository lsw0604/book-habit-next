import { queryKeys } from '@/constant/queries-key';
import { getPublicCommentListAPI } from '@/service/public-comment';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function usePublicCommentInfiniteQuery({
  end_date,
  start_date,
  page_size,
}: Pick<RequestGetPublicCommentList, 'end_date' | 'start_date' | 'page_size'>) {
  return useInfiniteQuery<
    ResponseGetPublicCommentList,
    AxiosError<NestServerErrorType>
  >({
    queryKey: [queryKeys.public.getList({ end_date, page_size, start_date })],
    queryFn: ({ pageParam = 1 }) =>
      getPublicCommentListAPI({
        start_date,
        end_date,
        page_size,
        page: pageParam as number,
      }),
    getNextPageParam: (response) => response.nextPage ?? undefined,
    initialPageParam: 1,
    gcTime: 0,
    staleTime: 0,
  });
}
