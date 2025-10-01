import { createQueryKeys } from '@lukemorales/query-key-factory';

export const searchQueryKeys = createQueryKeys('search', {
  book: <T extends object>(params: Omit<T, 'page'>) => ({
    queryKey: [params],
  }),
});
