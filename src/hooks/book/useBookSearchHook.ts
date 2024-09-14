import { useInfiniteQuery } from '@tanstack/react-query';
import { queries } from '@/src/constant/queries-key';
import { bookSearchAPI } from '@/src/service/book';

export function useBookSearchInfiniteQuery(param: RequestBookSearch) {
  return useInfiniteQuery<ResponseBookSearch>(
    queries.book.search(param),
    async ({ pageParam = 1 }) => {
      const response = await bookSearchAPI({
        page: pageParam,
        ...param,
      });
      return response;
    },
    {
      getNextPageParam: (response, pages) => {
        if (response.meta.is_end) return undefined;
        return pages.length + 1;
      },
      keepPreviousData: true,
    }
  );
}
