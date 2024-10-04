import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { searchBookAPI } from '@/service/search';
import { getMyBookDetailAPI, getMyBookListAPI } from '@/service/my-book';
import { kakaoLoginAPI, loginAPI } from '@/service/auth';

export const queryKeys = createQueryKeyStore({
  search: {
    book: (params: Omit<RequestSearchBook, 'page'>) => ({
      queryKey: [params],
      queryFn: () => searchBookAPI(params),
    }),
  },
  myBook: {
    getList: (params: Pick<RequestGetMyBookList, 'order' | 'status'>) => ({
      queryKey: [params],
      queryFn: getMyBookListAPI,
    }),
    getDetail: (params: RequestGetMyBookDetail) => ({
      queryKey: [params.toString()],
      queryFn: getMyBookDetailAPI,
    }),
  },
  auth: {
    login: () => ({
      queryKey: ['login'],
      queryFn: loginAPI,
    }),
    kakao: (code: string) => ({
      queryKey: ['kakao', code],
      queryFn: kakaoLoginAPI,
    }),
  },
});
