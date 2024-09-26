import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constant/queries-key';
import { getMyBookListAPI } from '@/service/my-book';

export default function useInfiniteMyBook({
  status = 'ALL',
  order = 'desc',
}: Pick<RequestGetMyBookList, 'order' | 'status'>) {
  return useInfiniteQuery<ResponseGetMyBookList>({
    queryKey: [queryKeys.myBook.getList({ status, order })],
    queryFn: ({ pageParam = 1 }) =>
      getMyBookListAPI({ status, order, page: pageParam as number }),
    getNextPageParam: (response, allPage) => {
      const nextPage = allPage.length + 1;
      return response.nextPage ? undefined : nextPage;
    },
    initialPageParam: 1,
  });
}
