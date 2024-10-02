import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { searchBookAPI } from '@/service/search';
import {
  getMyBookDetailAPI,
  getMyBookListAPI,
  putMyBookDetailAPI,
  registerMyBookAPI,
} from '@/service/my-book';
import { kakaoLoginAPI, loginAPI } from '@/service/auth';

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
    getList: (params: Pick<RequestGetMyBookList, 'order' | 'status'>) => ({
      queryKey: [params],
      queryFn: getMyBookListAPI,
    }),
  },
  myBookDetail: {
    getDetail: (params: RequestGetMyBookDetail) => ({
      queryKey: [params],
      queryFn: () => getMyBookDetailAPI(params),
    }),
    putDetail: (params: RequestPutMyBookDetail) => ({
      queryKey: [params],
      queryFn: putMyBookDetailAPI,
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
