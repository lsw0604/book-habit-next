import type {
  MyBookService,
  RequestPostMyBook,
  ResponsePostMyBook,
  RequestGetMyBooks,
  ResponseGetMyBooks,
  RequestGetMyBook,
  ResponseGetMyBook,
  RequestPutMyBook,
  ResponsePutMyBook,
  RequestDeleteMyBook,
  ResponseDeleteMyBook,
} from './types';

import { stringify } from 'querystring';
import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { isClient } from '@/lib/axios/constant';

let myBookServiceInstance: MyBookService | null = null;

export const createMyBookService = (): MyBookService => {
  if (isClient && myBookServiceInstance) {
    return myBookServiceInstance;
  }

  const client = axiosInstance;

  const service: MyBookService = {
    postMyBook: async (payload: RequestPostMyBook) => {
      const response = await client.post<ResponsePostMyBook>(
        API_ENDPOINTS.MY_BOOK,
        payload
      );

      return response.data;
    },
    getMyBooks: async ({
      order = 'asc',
      page = 1,
      status = 'ALL',
    }: RequestGetMyBooks) => {
      const queryString = stringify({ page, status, order });
      const response = await client.get<ResponseGetMyBooks>(
        `${API_ENDPOINTS.MY_BOOK}?${queryString}`
      );
      return response.data;
    },
    getMyBook: async ({ myBookId }: RequestGetMyBook) => {
      const response = await client.get<ResponseGetMyBook>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
      );
      return response.data;
    },
    putMyBook: async ({ myBookId, status, rating }: RequestPutMyBook) => {
      const response = await client.put<ResponsePutMyBook>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`,
        {
          status,
          rating,
        }
      );
      return response.data;
    },
    deleteMyBook: async ({ myBookId }: RequestDeleteMyBook) => {
      const response = await client.delete<ResponseDeleteMyBook>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
      );
      return response.data;
    },
  };

  if (isClient) {
    myBookServiceInstance = service;
  }

  return service;
};

export const myBookService = (): MyBookService => {
  return createMyBookService();
};
