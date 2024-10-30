import { createQueryKeys } from '@lukemorales/query-key-factory';

export const myBookQueryKeys = createQueryKeys('myBook', {
  all: (params: Pick<RequestGetMyBookList, 'order' | 'status'>) => ({
    queryKey: [params],
  }),
  detail: (params: RequestGetMyBookDetail) => ({
    queryKey: [params.toString()],
  }),
});
