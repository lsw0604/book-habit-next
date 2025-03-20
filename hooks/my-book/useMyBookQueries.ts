import type {
  RequestGetMyBook,
  RequestGetMyBooks,
  ResponseGetMyBook,
  ResponseGetMyBooks,
  RequestDeleteMyBook,
  RequestPostMyBook,
  ResponsePostMyBook,
  RequestPutMyBook,
  ResponsePutMyBook,
} from '@/service/api/my-book/types';
import type { AxiosError } from 'axios';

import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { myBookService } from '@/service/api/my-book';
import { queryKeys } from '@/queries';
import { useMyBookInvalidateCache } from './useMyBookInvalidateCache';
import { useMyBookUpdateCache } from './useMyBookUpdateCache';

export const useMyBooks = (
  params: Pick<RequestGetMyBooks, 'order' | 'status'>
) => {
  const service = myBookService();

  return useInfiniteQuery<
    ResponseGetMyBooks,
    AxiosError<NestServerErrorType>,
    Pick<ResponseGetMyBooks, 'books'>
  >({
    queryKey: queryKeys.myBook.list(params).queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await service.getMyBooks({
        ...params,
        page: pageParam as number,
      });

      return response;
    },
    getNextPageParam: response => response.nextPage ?? undefined,
    initialPageParam: 1,
    select: data => ({ books: data.pages.flatMap(page => page.books) }),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  });
};

export const useMyBook = ({ myBookId }: RequestGetMyBook) => {
  const service = myBookService();

  return useQuery<ResponseGetMyBook, AxiosError<NestServerErrorType>>({
    queryKey: queryKeys.myBook.detail({ myBookId }).queryKey,
    queryFn: () => service.getMyBook({ myBookId }),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
};

export const useMyBookMutation = () => {
  const { invalidateList, invalidateDetail } = useMyBookInvalidateCache();
  const { updateMyBookQueryData } = useMyBookUpdateCache();
  const service = myBookService();

  const addMyBook = useMutation<
    ResponsePostMyBook,
    AxiosError<NestServerErrorType>,
    RequestPostMyBook
  >({
    mutationFn: (payload: RequestPostMyBook) => service.postMyBook(payload),
    onSuccess: invalidateList,
  });

  const updateMyBook = useMutation<
    ResponsePutMyBook,
    AxiosError<NestServerErrorType>,
    RequestPutMyBook
  >({
    mutationFn: (payload: RequestPutMyBook) => service.putMyBook(payload),
    onSuccess: response => {
      invalidateList();
      updateMyBookQueryData(response);
    },
  });

  const removeMyBook = useMutation<
    ResponseDeleteMyBook,
    AxiosError<NestServerErrorType>,
    RequestDeleteMyBook
  >({
    mutationFn: (payload: RequestDeleteMyBook) => service.deleteMyBook(payload),
    onMutate: ({ myBookId }) => invalidateDetail(myBookId),
    onSuccess: invalidateList,
  });

  return { addMyBook, updateMyBook, removeMyBook };
};
