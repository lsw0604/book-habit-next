import { createQueryKeys } from '@lukemorales/query-key-factory';

export const myBookQueryKeys = createQueryKeys('myBook', {
  list: (params: Pick<RequestGetMyBookList, 'order' | 'status'>) => ({
    queryKey: [params.status, params.order],
  }),
  detail: (params: RequestGetMyBookDetail) => ({
    queryKey: [params.toString()],
  }),
});
