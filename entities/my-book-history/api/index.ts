import type {
  MyBookHistory,
  MyBookHistoryService,
  CreateMyBookHistoryPayload,
  UpdateMyBookHistoryPayload,
} from './types';
import { apiClient } from '@/shared/api/clients/api';
import { API_ENDPOINTS } from '@/shared/api/constant';

export const myBookHistoryService: MyBookHistoryService = {
  addMyBookHistory: async (
    payload: CreateMyBookHistoryPayload
  ): Promise<MyBookHistory> => {
    const { myBookId, ...data } = payload;
    const response: MyBookHistory = await apiClient.post<MyBookHistory>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookId}`,
      data
    );
    return response;
  },
  getMyBookHistories: async (myBookId: number): Promise<MyBookHistory[]> => {
    const response: MyBookHistory[] = await apiClient.get<MyBookHistory[]>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookId}`
    );
    return response;
  },
  updateMyBookHistory: async (
    payload: UpdateMyBookHistoryPayload
  ): Promise<MyBookHistory> => {
    const { id: myBookHistoryId, ...data } = payload;
    const response: MyBookHistory = await apiClient.patch<MyBookHistory>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`,
      data
    );
    return response;
  },
  deleteMyBookHistory: async (
    myBookHistoryId: number
  ): Promise<MyBookHistory> => {
    const response: MyBookHistory = await apiClient.delete<MyBookHistory>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`
    );
    return response;
  },
};
