import { useInfiniteQuery } from '@tanstack/react-query';

import type { BookSummary } from '@/entities/book';
import { type APIError, useApiStatus } from '@/shared/api';

import type { BookSearchParams } from '../schema';
import type { BookSearchsDTO } from '../api';
import { bookSearchService, bookSearchQueryKeys } from '../api';
import { toSummaryBookViewModel } from '../lib';

export const useBookSearch = ({ query, size, sort, target, }: BookSearchParams) => {
  const { isInitialized } = useApiStatus();
  const { searchBook } = bookSearchService;
  return useInfiniteQuery<
    BookSearchsDTO,
    APIError,
    BookSummary[]
  >({
    queryKey: bookSearchQueryKeys.search({ query, size, sort, target }).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      searchBook({
        query,
        size,
        sort,
        target,
        page: pageParam as number,
      }),
    getNextPageParam: (response, allPage) => {
      const nextPage = allPage.length + 1;
      return response.meta.hasNextPage ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: isInitialized && !!query,
    select: data =>
      data.pages.flatMap(page =>
        page.items.map(i => toSummaryBookViewModel(i))
      ),
  });
};
