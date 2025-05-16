import { AxiosError } from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { myBookService } from '@/entities/my-book/api';
import { GetMyBooksPayload, MyBooks } from '@/entities/my-book/api/types';
import { ErrorResponseDto } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

export const useMyBooks = (
  params: Pick<GetMyBooksPayload, 'order' | 'status'>,
  option: { forceRefetch?: boolean } = {}
) => {
  const { getMyBooks } = myBookService;
  const { forceRefetch = false } = option;

  return useInfiniteQuery<MyBooks, AxiosError<ErrorResponseDto>, MyBooks>({
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
    select: data => {
      if (data.pages.length === 0) {
        return { books: [], meta: { totalCount: 0, totalPages: 0 } };
      }

      const lastPage = data.pages[data.pages.length - 1];
      const lastMeta = lastPage.meta || { totalCount: 0, totalPages: 0 };

      return {
        books: data.pages.flatMap(page => page.books || []),
        meta: lastMeta,
      };
    },
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    refetchOnMount: forceRefetch,
    refetchOnWindowFocus: forceRefetch,
  });
};
