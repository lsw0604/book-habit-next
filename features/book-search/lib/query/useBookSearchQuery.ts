import type { AxiosError } from 'axios';
import type { ErrorResponseDto } from '@/shared/api/types';
import type {
  ResponseSearch,
  SearchPayload,
  KakaoDocument,
} from '@/features/book-search/api/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { bookSearchService } from '@/features/book-search/api';
import { queryKeys } from '@/shared/query/keys';

export const useBookSearchQuery = ({
  query,
  size,
  sort,
  target,
}: Omit<SearchPayload, 'page'>) => {
  return useInfiniteQuery<
    ResponseSearch,
    AxiosError<ErrorResponseDto>,
    KakaoDocument[]
  >({
    queryKey: queryKeys.search.book({ query, size, sort, target }).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      bookSearchService.search({
        query,
        size,
        sort,
        target,
        page: pageParam as number,
      }),
    getNextPageParam: (response, allPage) => {
      const nextPage = allPage.length + 1;
      return response.meta.is_end ? undefined : nextPage;
    },
    initialPageParam: 1,
    enabled: !!query,
    select: data => data.pages.flatMap(page => page.documents),
  });
};
