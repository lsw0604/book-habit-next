import { createQueryKeys } from '@lukemorales/query-key-factory';
import MyBookService from './MyBookService';

export const myBookQueryKeys = createQueryKeys('myBook', {
  all: (params: RequestGetMyBookList) => ({
    queryKey: [params],
    queryFn: () => MyBookService.all(params),
  }),
  detail: (params: RequestGetMyBookDetail) => ({
    queryKey: [params.toString()],
  }),
});

export const myBookQueryOptions = {
  all: (params: RequestGetMyBookList) => ({
    queryKey: [...myBookQueryKeys.all(params).queryKey],
    queryFn: () => MyBookService.all(params),
  }),
  detail: (params: RequestGetMyBookDetail) => ({
    queryKey: [myBookQueryKeys.detail(params).queryKey],
    queryFn: myBookQueryKeys.detail(params).queryKey,
  }),
};
