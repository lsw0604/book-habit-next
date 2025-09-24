import { createQueryKeys } from '@lukemorales/query-key-factory';

import { SearchPayload } from '@/entities/book';

export const searchQueryKeys = createQueryKeys('search', {
  book: (params: Omit<SearchPayload, 'page'>) => ({
    queryKey: [params],
  }),
});
