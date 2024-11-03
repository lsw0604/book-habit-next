import { AxiosError } from 'axios';
import { useInfiniteQuery, useQuery, useMutation } from '@tanstack/react-query';
import MyBookService from '@/service/my-book/MyBookService';
import { useMyBookInvalidateCache } from '@/hooks/my-book/useMyBookInvalidateCache';
import { useMyBookUpdateCache } from '@/hooks/my-book/useMyBookUpdateCache';
import { queryKeys } from '@/queries/query-key';

export function useMyBooks(
  params: Pick<RequestGetMyBookList, 'order' | 'status'>
) {
  return useInfiniteQuery<
    ResponseGetMyBookList,
    AxiosError<NestServerErrorType>,
    Pick<ResponseGetMyBookList, 'books'>
  >({
    queryKey: queryKeys.myBook.list(params).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      MyBookService.all({ ...params, page: pageParam as number }),
    getNextPageParam: (response) => response.nextPage ?? undefined,
    initialPageParam: 1,
    select: (data) => ({ books: data.pages.flatMap((page) => page.books) }),
    gcTime: 5 * 60 * 1000, // 5분
    staleTime: 1 * 60 * 1000, // 1분
  });
}

export function useMyBook(myBookId: RequestGetMyBookDetail) {
  return useQuery<ResponseGetMyBookDetail, AxiosError<NestServerErrorType>>({
    queryKey: queryKeys.myBook.detail(myBookId).queryKey,
    queryFn: () => MyBookService.detail(myBookId),
    gcTime: 30 * 60 * 1000, // 30분
    staleTime: 10 * 60 * 1000, // 10분
  });
}

export function useMyBookMutation() {
  const { invalidateList, invalidateDetail } = useMyBookInvalidateCache();
  const { updateMyBookQueryData } = useMyBookUpdateCache();

  const addMyBook = useMutation<
    ResponseRegisterMyBook,
    AxiosError<NestServerErrorType>,
    RequestRegisterMyBook
  >({
    mutationFn: (payload: RequestRegisterMyBook) => MyBookService.add(payload),
    onSuccess: invalidateList,
  });

  const updateMyBook = useMutation<
    ResponsePutMyBook,
    AxiosError<NestServerErrorType>,
    RequestPutMyBook
  >({
    mutationFn: (payload: RequestPutMyBook) => MyBookService.update(payload),
    onSuccess: (response) => {
      invalidateList();
      updateMyBookQueryData(response);
    },
  });

  const removeMyBook = useMutation<
    ResponseDeleteMyBook,
    AxiosError<NestServerErrorType>,
    RequestDeleteMyBook
  >({
    mutationFn: (payload: RequestDeleteMyBook) => MyBookService.remove(payload),
    onMutate: invalidateDetail,
    onSuccess: invalidateList,
  });

  return {
    addMyBook,
    removeMyBook,
    updateMyBook,
  };
}
