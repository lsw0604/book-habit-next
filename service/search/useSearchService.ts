import { AxiosError } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/queries/query-key';
import SearchService from '@/service/search/SearchService';

export function useSearchService(params: Omit<RequestSearchBook, 'page'>) {
  return useInfiniteQuery<ResponseSearchBook, AxiosError, KakaoDocument[]>({
    queryKey: queryKeys.search.book(params).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      SearchService.searchBook({ ...params, page: pageParam as number }),
    getNextPageParam: (response, allPage) => {
      const nextPage = allPage.length + 1;
      return response.meta.is_end ? undefined : nextPage;
    },
    initialPageParam: 1,
    enabled: !!params.query,
    select: (data) => data.pages.flatMap((page) => page.documents),
  });
}
