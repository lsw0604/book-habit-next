import { createQueryKeyStore } from '@lukemorales/query-key-factory';
import { searchBookAPI } from '../service/search';

export const queryKeys = createQueryKeyStore({
  search: {
    book: (params: Omit<RequestSearchBook, 'page'>) => ({
      queryKey: [params],
      queryFn: () => searchBookAPI(params),
    }),
  },
});
