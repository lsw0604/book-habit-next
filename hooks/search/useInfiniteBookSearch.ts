import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constant/queries-key';
import { bookSearchAPI } from '@/service/book';

export function useInfiniteSearchBook(param: Omit<RequestBookSearch, 'page'>) {
  const {
    data,
    error,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<ResponseBookSearch>({
    queryKey: [queryKeys.book.search(param)],
    queryFn: ({ pageParam = 1 }) =>
      bookSearchAPI({ ...param, page: pageParam as number }),
    getNextPageParam: (response, allPage) => {
      const nextPage = allPage.length + 1;
      return response.meta.is_end ? undefined : nextPage;
    },
    initialPageParam: 1,
  });

  return {
    data,
    error,
    isError,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
}
