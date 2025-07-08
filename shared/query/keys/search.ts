import { SearchPayload } from '@/entities/book/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const searchQueryKeys = createQueryKeys('search', {
  book: (params: Omit<SearchPayload, 'page'>) => ({
    queryKey: [params],
  }),
});
