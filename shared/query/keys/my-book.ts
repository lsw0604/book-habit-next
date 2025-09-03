import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { GetMyBooksPayload } from '@/entities/my-book/api/types';

export const myBookQueryKeys = createQueryKeys('myBook', {
  list: (params: Pick<GetMyBooksPayload, 'order' | 'status'>) => ({
    queryKey: [params.status, params.order],
  }),
  detail: (myBookId: number) => ({
    queryKey: [myBookId.toString()],
  }),
});
