import { createQueryKeys } from '@lukemorales/query-key-factory';

export const myBookHistoryQueryKeys = createQueryKeys('myBookHistory', {
  list: (myBookId: number) => ({
    queryKey: [myBookId.toString()],
  }),
});
