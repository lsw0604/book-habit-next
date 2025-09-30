import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query/keys';

import type { ResponseSearchDTO } from '../api/book.dto';
import { bookService } from '../api/service';
import type { SearchPayload } from '../api/types';
import type { Book } from '../model';
import { toBookViewModel } from '../model/book.mapper';

export const useBookQuery = ({
  query,
  size,
  sort,
  target,
}: Omit<SearchPayload, 'page'>) =>
  useInfiniteQuery<ResponseSearchDTO, AxiosError<ErrorDTO>, Book[]>({
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
