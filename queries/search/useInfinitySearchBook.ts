import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constant/queries-key';
import { searchBookAPI } from '@/service/search';

export default function useInfiniteSearchBook(
  param: Omit<RequestSearchBook, 'page'>
) {
  return useInfiniteQuery<ResponseSearchBook>({
    queryKey: [queryKeys.search.book(param)],
    queryFn: ({ pageParam = 1 }) =>
      searchBookAPI({ ...param, page: pageParam as number }),
    getNextPageParam: (response, allPage) => {
      const nextPage = allPage.length + 1;
      return response.meta.is_end ? undefined : nextPage;
    },
    initialPageParam: 1,
    enabled: param.query !== '',
  });
}
