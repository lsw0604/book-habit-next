import type { AxiosError } from 'axios';
import type {
  ResponseSearchBook,
  RequestSearchBook,
  KakaoDocument,
} from '@/service/api/search/types';
import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/queries';
import { searchService } from '@/service/api/search';

export const useSearch = ({
  query,
  size,
  sort,
  target,
}: Omit<RequestSearchBook, 'page'>) => {
  const service = searchService();

  return useInfiniteQuery<
    ResponseSearchBook,
    AxiosError<NestServerErrorType>,
    KakaoDocument[]
  >({
    queryKey: queryKeys.search.book({ query, size, sort, target }).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      service.searchBook({
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
