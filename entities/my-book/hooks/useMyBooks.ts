import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { useApiStatus } from '@/shared/api/hooks';
import { queryKeys } from '@/shared/query/keys';

import { type GetMyBooksPayload, type MyBooksDTO, myBookService } from '../api';
import { MyBooks, toMyBooksViewModel } from '../model';

export const useMyBooks = (
  params: Pick<GetMyBooksPayload, 'order' | 'status'>
) => {
  const { getMyBooks } = myBookService;
  const { isInitialized } = useApiStatus();

  return useInfiniteQuery<MyBooksDTO, AxiosError<ErrorDTO>, MyBooks>({
    queryKey: queryKeys.myBook.list(params).queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getMyBooks({
        ...params,
        page: pageParam as number,
      });
      return response;
    },
    getNextPageParam: response => response.meta?.nextPage,
    initialPageParam: 1,
    enabled: isInitialized,
    select: data => {
      if (data.pages.length === 0) {
        return { books: [], meta: { totalCount: 0, totalPages: 0 } };
      }

      const lastPage = data.pages[data.pages.length - 1];
      const lastMeta = lastPage.meta || { totalCount: 0, totalPages: 0 };

      return toMyBooksViewModel({
        books: data.pages.flatMap(page => page.books || []),
        meta: lastMeta,
      });
    },
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
