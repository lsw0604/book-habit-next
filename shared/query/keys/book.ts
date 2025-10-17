import { createQueryKeys } from '@lukemorales/query-key-factory';

export const bookQueryKeys = createQueryKeys('book', {
  search: <T extends object>(params: Omit<T, 'page'>) => ({
    queryKey: [params],
  }),
  detail: (bookId: number) => ({
    queryKey: [bookId.toString()],
  }),
});
