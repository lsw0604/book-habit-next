import { createQueryKeyStore } from '@lukemorales/query-key-factory';

import { kakaoLoginAPI } from '@/service/auth';
import { searchBookAPI } from '@/service/search';
import { getMyBookDetailAPI, getMyBookListAPI } from '@/service/my-book';
import { getMyBookCommentListAPI } from '@/service/my-book-comment';
import { getPublicCommentListAPI } from '@/service/public-comment';

export const queryKeys = createQueryKeyStore({
  search: {
    book: (params: Omit<RequestSearchBook, 'page'>) => ({
      queryKey: [params],
      queryFn: () => searchBookAPI(params),
    }),
  },
  public: {
    getList: (
      params: Pick<
        RequestGetPublicCommentList,
        'start_date' | 'end_date' | 'page_size'
      >
    ) => ({
      queryKey: [params],
      queryFn: getPublicCommentListAPI,
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
  myBookComment: {
    getList: (params: RequestMyBookCommentList) => ({
      queryKey: [params.myBookId.toString()],
      queryFn: getMyBookCommentListAPI,
    }),
  },
  auth: {
    kakao: (code: string) => ({
      queryKey: ['kakao', code],
      queryFn: kakaoLoginAPI,
    }),
  },
});
