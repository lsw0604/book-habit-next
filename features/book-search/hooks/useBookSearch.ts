import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { useApiStatus } from '@/shared/api/hooks';
import { queryKeys } from '@/shared/query/keys';

import type { BookSearchParams, BookSummary } from '../model';
import type { BookSearchsDTO } from '../api';
import { bookSearchService } from '../api';
import { toSummaryBookViewModel } from '../lib';

export const useBookSearch = ({ query, size, sort, target, }: BookSearchParams) => {
  const { isInitialized } = useApiStatus();
  const { searchBook } = bookSearchService;
  return useInfiniteQuery<
    BookSearchsDTO,
    AxiosError<ErrorDTO>,
    BookSummary[]
  >({
    queryKey: queryKeys.book.search({ query, size, sort, target }).queryKey,
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
