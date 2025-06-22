import { useInfiniteQuery } from '@tanstack/react-query';
import { bookService, ResponseSearchDTO, SearchPayload } from '../api';
import { AxiosError } from 'axios';
import { Book } from '../model';
import { toBookViewModel } from '../lib';
import { ErrorResponseDto } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

export const useBookQuery = ({
  query,
  size,
  sort,
  target,
}: Omit<SearchPayload, 'page'>) => {
  return useInfiniteQuery<
    ResponseSearchDTO,
    AxiosError<ErrorResponseDto>,
    Book[]
  >({
    queryKey: queryKeys.search.book({ query, size, sort, target }).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      bookService.search({
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
    select: data =>
      data.pages.flatMap(page => page.documents.map(i => toBookViewModel(i))),
  });
};
