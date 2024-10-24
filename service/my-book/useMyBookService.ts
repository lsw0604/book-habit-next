import { useInfiniteQuery } from '@tanstack/react-query';
import { myBookQueryOptions } from './myBookQuery';
import { AxiosError } from 'axios';

export function useMyBooks(
  params: Pick<RequestGetMyBookList, 'order' | 'status'>
) {
  return useInfiniteQuery<
    ResponseGetMyBookList,
    AxiosError<NestServerErrorType>,
    Pick<ResponseGetMyBookList, 'books'>
  >({
    queryKey: myBookQueryOptions.all(params).queryKey,
    queryFn: ({ pageParam = 1 }) =>
      myBookQueryOptions
        .all({ ...params, page: pageParam as number })
        .queryFn(),
    getNextPageParam: (response) => response.nextPage ?? undefined,
    initialPageParam: 1,
    select: (data) => ({ books: data.pages.flatMap((page) => page.books) }),
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

// export const myBookQueryOptions = {
//   all: (params: RequestGetMyBookList) => ({
//     queryKey: [myBookQueryKeys.all(params)],
//     queryFn: () => MyBookService.all(params),
//   }),
//   detail: (params: RequestGetMyBookDetail) => ({
//     queryKey: [myBookQueryKeys.detail(params)],
//     queryFn: () => MyBookService.detail(params),
//   }),
// };

// export const myBookQueryKeys = createQueryKeys('myBook', {
//   all: (params: RequestGetMyBookList) => ({
//     queryKey: [params],
//     queryFn: () => MyBookService.all({ ...params }),
//   }),
//   detail: (params: RequestGetMyBookDetail) => ({
//     queryKey: [params.toString()],
//     queryFn: () => MyBookService.detail(params),
//   }),
// });
