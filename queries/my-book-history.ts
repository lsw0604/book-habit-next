import { createQueryKeys } from '@lukemorales/query-key-factory';

export const myBookHistoryQueryKeys = createQueryKeys('myBookHistory', {
  list: (params: RequestGetMyBookHistory) => ({
    queryKey: [params.toString()],
  }),
});
