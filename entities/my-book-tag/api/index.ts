import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type {
  MyBookTag,
  MyBookTagService,
  CreateMyBookTagPayload,
  ResponseDeleteMyBookTag,
} from './types';

export const myBookTagService: MyBookTagService = {
  add: async (payload: CreateMyBookTagPayload): Promise<MyBookTag> => {
    const { myBookId, ...data } = payload;
    const response: MyBookTag = await apiClient.post<MyBookTag>(
      `${API_ENDPOINTS.MY_BOOK_TAG}/${myBookId}`,
      data
    );
    return response;
  },
  getAll: async (myBookId: number): Promise<MyBookTag[]> => {
    const response: MyBookTag[] = await apiClient.get<MyBookTag[]>(
      `${API_ENDPOINTS.MY_BOOK_TAG}/${myBookId}`
    );
    return response;
  },
  delete: async (myBookTagId: number): Promise<ResponseDeleteMyBookTag> => {
    const response: ResponseDeleteMyBookTag = await apiClient.delete(
      `${API_ENDPOINTS.MY_BOOK_TAG}/${myBookTagId}`
    );
    return response;
  },
};
