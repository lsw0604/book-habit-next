import { createQueryKeys } from '@lukemorales/query-key-factory';

export const searchQueryKeys = createQueryKeys('search', {
  book: (params: Omit<RequestSearchBook, 'page'>) => ({
    queryKey: [params],
  }),
});
