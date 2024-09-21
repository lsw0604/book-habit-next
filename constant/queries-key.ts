import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { searchBookAPI } from '@/service/search';
import { registerMyBookAPI } from '@/service/my-book';
import { loginAPI } from '@/service/auth';

export const queryKeys = createQueryKeyStore({
  search: {
    book: (params: Omit<RequestSearchBook, 'page'>) => ({
      queryKey: [params],
      queryFn: () => searchBookAPI(params),
    }),
  },
  myBook: {
    register: (params: Pick<RequestRegisterMyBook, 'title'>) => ({
      queryKey: [params],
      queryFn: registerMyBookAPI,
    }),
  },
  auth: {
    login: () => ({
      queryKey: ['login'],
      queryFn: loginAPI,
    }),
  },
});
