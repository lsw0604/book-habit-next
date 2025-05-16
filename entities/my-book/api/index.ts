import type {
  MyBook,
  MyBooks,
  MyBookDetail,
  MyBookService,
  GetMyBooksPayload,
  CreateMyBookPayload,
  UpdateMyBookPayload,
  ResponseDeleteMyBook,
} from './types';
import { stringify } from 'querystring';
import { API_ENDPOINTS } from '@/shared/api/constant';
import { apiClient } from '@/shared/api/clients';

export const myBookService: MyBookService = {
  getMyBook: async (myBookId: number): Promise<MyBookDetail> => {
    const response: MyBookDetail = await apiClient.get<MyBookDetail>(
      `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
    );
    return response;
  },
  getMyBooks: async (params: GetMyBooksPayload): Promise<MyBooks> => {
    const queryString = stringify({ ...params });
    const response: MyBooks = await apiClient.get<MyBooks>(
      `${API_ENDPOINTS.MY_BOOK}?${queryString}`
    );
    return response;
  },
  addMyBook: async (payload: CreateMyBookPayload): Promise<MyBook> => {
    const response = await apiClient.post<MyBook>(
      API_ENDPOINTS.MY_BOOK,
      payload
    );
    return response;
  },
  updateMyBook: async (payload: UpdateMyBookPayload): Promise<MyBookDetail> => {
    const { myBookId, ...data } = payload;
    const response = await apiClient.patch<MyBookDetail>(
      `${API_ENDPOINTS.MY_BOOK}/${myBookId}`,
      data
    );
    return response;
  },
  deleteMyBook: async (myBookId: number): Promise<ResponseDeleteMyBook> => {
    const response: ResponseDeleteMyBook =
      await apiClient.delete<ResponseDeleteMyBook>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
      );
    return response;
  },
};
