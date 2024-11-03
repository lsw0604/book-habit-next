import { createQueryKeys } from '@lukemorales/query-key-factory';

export const publicCommentQueryKeys = createQueryKeys('publicComment', {
  list: (
    params: Pick<
      RequestGetPublicCommentList,
      'page_size' | 'start_date' | 'end_date'
    >
  ) => ({
    queryKey: [params.page_size, params.start_date, params.end_date],
  }),
});
