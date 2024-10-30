import { createQueryKeys } from '@lukemorales/query-key-factory';

export const myBookCommentQueryKeys = createQueryKeys('myBookComment', {
  all: (params: RequestGetMyBookCommentList) => ({
    queryKey: [params.toString()],
  }),
});
