import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getMyBookListAPI } from '@/service/my-book';
import { queryKeys } from '@/constant/queries-key';

export default function useMyBookInfiniteQuery({
  status,
  order,
}: Pick<RequestGetMyBookList, 'order' | 'status'>) {
  return useInfiniteQuery<
    ResponseGetMyBookList,
    AxiosError<NestServerErrorType>,
    Pick<ResponseGetMyBookList, 'books'>
  >({
    queryKey: [queryKeys.myBook.getList({ status, order })],
    queryFn: ({ pageParam = 1 }) =>
      getMyBookListAPI({ status, order, page: pageParam as number }),
    getNextPageParam: (response) => response.nextPage ?? undefined,
    initialPageParam: 1,
    select: (data) => ({ books: data.pages.flatMap((page) => page.books) }),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
