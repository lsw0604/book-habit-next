import { stringify } from 'querystring';

import { apiClient, API_ENDPOINTS, type RequestOptions } from '@/shared/api';

import type { MyBooksDTO, MyBookDetailDTO } from './my-book.dto';

export interface GetMyBooksPayload {
  page: number;
  status: string;
  order: string;
}

/**
 * options는 서버 컴포넌트에서 쿠키를 실어 보내기 위한 통로다.
 * @see shared/api/server/withServerAuth
 */
export interface MyBookService {
  getMyBook: (
    myBookId: number,
    options?: RequestOptions
  ) => Promise<MyBookDetailDTO>;
  getMyBooks: (
    payload: GetMyBooksPayload,
    options?: RequestOptions
  ) => Promise<MyBooksDTO>;
  findByIsbn: (
    isbn: string,
    options?: RequestOptions
  ) => Promise<MyBookDetailDTO | null>;
}

export const myBookService: MyBookService = {
  getMyBook: async (myBookId, options) => {
    const response = await apiClient.get<MyBookDetailDTO>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}/${myBookId}`,
      options
    );
    return response;
  },
  getMyBooks: async (payload, options) => {
    const queryString = stringify({ ...payload });
    const response = await apiClient.get<MyBooksDTO>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}?${queryString}`,
      options
    );
    return response;
  },
  findByIsbn: async (isbn, options) => {
    const response = await apiClient.get<MyBookDetailDTO | null>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}/is-exist/${isbn}`,
      options
    );
    return response;
  },
};
