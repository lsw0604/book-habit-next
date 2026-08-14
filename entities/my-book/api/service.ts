import { stringify } from 'querystring';

import type { AxiosRequestConfig } from 'axios';

import { apiClient, API_ENDPOINTS } from '@/shared/api';

import type { MyBooksDTO, MyBookDetailDTO } from './my-book.dto';

export interface GetMyBooksPayload {
  page: number;
  status: string;
  order: string;
}

/**
 * config는 서버 컴포넌트에서 쿠키를 실어 보내기 위한 통로다.
 * @see shared/api/server/withServerAuth
 */
export interface MyBookService {
  getMyBook: (
    myBookId: number,
    config?: AxiosRequestConfig
  ) => Promise<MyBookDetailDTO>;
  getMyBooks: (
    payload: GetMyBooksPayload,
    config?: AxiosRequestConfig
  ) => Promise<MyBooksDTO>;
  findByIsbn: (
    isbn: string,
    config?: AxiosRequestConfig
  ) => Promise<MyBookDetailDTO | null>;
}

export const myBookService: MyBookService = {
  getMyBook: async (myBookId, config) => {
    const response = await apiClient.get<MyBookDetailDTO>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}/${myBookId}`,
      config
    );
    return response;
  },
  getMyBooks: async (payload, config) => {
    const queryString = stringify({ ...payload });
    const response = await apiClient.get<MyBooksDTO>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}?${queryString}`,
      config
    );
    return response;
  },
  findByIsbn: async (isbn, config) => {
    const response = await apiClient.get<MyBookDetailDTO | null>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}/is-exist/${isbn}`,
      config
    );
    return response;
  },
};
