import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { useApiStatus } from '@/shared/api/hooks';
import { queryKeys } from '@/shared/query/keys';

import {
  type BookSearchPayload,
  type ResponseSearchDTO,
  bookService,
} from '../api';
import { toBookViewModel } from '../lib';
import type { Book } from '../model';

export const useBookSearch = ({
  query,
  size,
  sort,
  target,
}: Omit<BookSearchPayload, 'page'>) => {
  const { isInitialized } = useApiStatus();
  return useInfiniteQuery<ResponseSearchDTO, AxiosError<ErrorDTO>, Book[]>({
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
    enabled: isInitialized && !!query,
    select: data =>
      data.pages.flatMap(page => page.documents.map(i => toBookViewModel(i))),
  });
};
