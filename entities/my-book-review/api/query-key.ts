import { createQueryKeys } from '@lukemorales/query-key-factory';

export const myBookReviewQueryKeys = createQueryKeys('myBookReview', {
  detail: (myBookId: number) => ({
    queryKey: [myBookId.toString()],
  }),
});
