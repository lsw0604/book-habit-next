import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { usePublicCommentService } from '@/service/public-comment/PublicCommentService';
import useServiceInstance from '@/hooks/useServiceInstance';
import { queryKeys } from '@/queries/query-key';

export function usePublicComments(
  payload: Pick<
    RequestGetPublicCommentList,
    'end_date' | 'start_date' | 'page_size'
  >
) {
  const PublicCommentService = useServiceInstance(usePublicCommentService);
  return useSuspenseInfiniteQuery<
    ResponseGetPublicCommentList,
    AxiosError<NestServerErrorType>,
    PublicCommentItem[]
  >({
    queryKey: queryKeys.publicComment.list(payload).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      PublicCommentService.all({ ...payload, page: pageParam as number }),
    select: (response) => {
      return response.pages.flatMap((page) => page.comments);
    },
    getNextPageParam: (response) => response.nextPage ?? undefined,
    initialPageParam: 1,
    gcTime: 0,
    staleTime: 0,
  });
}
