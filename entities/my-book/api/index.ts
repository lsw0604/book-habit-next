import type {
  MyBookService,
  GetMyBookPayload,
  GetMyBooksPayload,
  CreateMyBookPayload,
  UpdateMyBookPayload,
  DeleteMyBookPayload,
} from './types';
import type { MyBookDTO, MyBooksDTO, MyBookDetailDTO } from './my-book-.dto';
import { API_ENDPOINTS } from '@/shared/api/constant';
import { apiClient } from '@/shared/api/clients';
import { stringify } from 'querystring';

export const myBookService: MyBookService = {
  getMyBook: async ({ myBookId }: GetMyBookPayload) => {
    const response = await apiClient.get<MyBookDetailDTO>(
      `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
    );
    return response;
  },
  getMyBooks: async (payload: GetMyBooksPayload) => {
    const queryString = stringify({ ...payload });
    const response = await apiClient.get<MyBooksDTO>(
      `${API_ENDPOINTS.MY_BOOK}?${queryString}`
    );
    return response;
  },
  addMyBook: async (payload: CreateMyBookPayload) => {
    const response = await apiClient.post<MyBookDTO>(
      API_ENDPOINTS.MY_BOOK,
      payload
    );
    return response;
  },
  updateMyBook: async (payload: UpdateMyBookPayload) => {
    const { myBookId, ...data } = payload;
    const response = await apiClient.patch<MyBookDetailDTO>(
      `${API_ENDPOINTS.MY_BOOK}/${myBookId}`,
      data
    );
    return response;
  },
  deleteMyBook: async ({ myBookId }: DeleteMyBookPayload) => {
    const response = await apiClient.delete<{ id: number }>(
      `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
    );
    return response;
  },
};
