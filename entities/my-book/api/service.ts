import { stringify } from 'querystring';

import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type { MyBooksDTO, MyBookDetailDTO } from './my-book.dto';

export interface MyBookService {
  getMyBook: (myBookId: number) => Promise<MyBookDetailDTO>;
  getMyBooks: (payload: GetMyBooksPayload) => Promise<MyBooksDTO>;
  findByIsbn: (isbn: string) => Promise<MyBookDetailDTO | null>;
}

export interface GetMyBooksPayload {
  page: number;
  status: string;
  order: string;
}

export const myBookService = {
  getMyBook: async (myBookId: number) => {
    const response = await apiClient.get<MyBookDetailDTO>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}/${myBookId}`
    );
    return response;
  },
  getMyBooks: async (payload: GetMyBooksPayload) => {
    const queryString = stringify({ ...payload });
    const response = await apiClient.get<MyBooksDTO>(
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}?${queryString}`
    );
    return response;
  },
  findByIsbn: async (isbn: string) => {
    const response = await apiClient.get<MyBookDetailDTO | null> (
      `${API_ENDPOINTS.MY_BOOK.DEFAULT}/is-exist/${isbn}`
    );
    return response;
  },
};
