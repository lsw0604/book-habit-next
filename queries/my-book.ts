import type {
  RequestGetMyBooks,
  RequestGetMyBook,
} from '@/service/api/my-book/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const myBookQueryKeys = createQueryKeys('myBook', {
  list: (params: Pick<RequestGetMyBooks, 'order' | 'status'>) => ({
    queryKey: [params.status, params.order],
  }),
  detail: ({ myBookId }: RequestGetMyBook) => ({
    queryKey: [myBookId.toString()],
  }),
});
