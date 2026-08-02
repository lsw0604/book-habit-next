import { createQueryKeys } from '@lukemorales/query-key-factory';

import type { GetMyBooksPayload } from './service';

export const myBookQueryKeys = createQueryKeys('myBook', {
  list: (params: Pick<GetMyBooksPayload, 'order' | 'status'>) => ({
    queryKey: [params.status, params.order],
  }),
  detail: (myBookId: number) => ({
    queryKey: [myBookId.toString()],
  }),
  exist: (isbn: string) => ({
    queryKey: [isbn],
  })
});
