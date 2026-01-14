import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { useApiStatus } from '@/shared/api/hooks';
import { queryKeys } from '@/shared/query/keys';
import { ResponsePagination } from '@/shared/types';

import { type KakaoPayload, type BookSummaryDTO, bookService } from '../api';
import { toSummaryBookViewModel } from '../lib';
import type { BookSummary } from '../model';

export const useKakaoBookSearch = ({
  query,
  size,
  sort,
  target,
}: Omit<KakaoPayload, 'page'>) => {
  const { isInitialized } = useApiStatus();
  return useInfiniteQuery<
    ResponsePagination<BookSummaryDTO>,
    AxiosError<ErrorDTO>,
    BookSummary[]
  >({
    queryKey: queryKeys.book.search({ query, size, sort, target }).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      bookService.kakaoSearch({
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
