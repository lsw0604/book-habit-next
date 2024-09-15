import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { bookSearchAPI } from '../service/book';

export const queryKeys = createQueryKeyStore({
  book: {
    search: (params: Omit<RequestBookSearch, 'page'>) => ({
      queryKey: [params],
      queryFn: () => bookSearchAPI(params),
    }),
  },
});
