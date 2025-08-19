import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import { MyBookHistoryDTO } from './my-book-history.dto';
import type {
  MyBookHistoryService,
  GetMyBookHistoriesPayload,
  CreateMyBookHistoryPayload,
  DeleteMyBookHistoryPayload,
  UpdateMyBookHistoryPayload,
} from './types';

export const myBookHistoryService: MyBookHistoryService = {
  getMyBookHistories: async (payload: GetMyBookHistoriesPayload) => {
    const { myBookId } = payload;

    const response = await apiClient.get<MyBookHistoryDTO[]>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}`,
      { params: { myBookId } }
    );

    return response;
  },
  addMyBookHistory: async (payload: CreateMyBookHistoryPayload) => {
    const { myBookId, date, startTime, endTime, ...rest } = payload;

    const apiPayload = {
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      ...rest,
    };

    const response = await apiClient.post<MyBookHistoryDTO>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookId}`,
      apiPayload
    );

    return response;
  },
  updateMyBookHistory: async (payload: UpdateMyBookHistoryPayload) => {
    const { startTime, endTime, id: myBookHistoryId, ...rest } = payload;

    const apiPayload = {
      startTime: startTime ? startTime.toISOString() : undefined,
      endTime: endTime ? endTime.toISOString() : undefined,
      ...rest,
    };

    const response = await apiClient.patch<MyBookHistoryDTO>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`,
      apiPayload
    );

    return response;
  },
  deleteMyBookHistory: async (payload: DeleteMyBookHistoryPayload) => {
    const { id: myBookHistoryId } = payload;

    const response = await apiClient.delete<MyBookHistoryDTO>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`
    );

    return response;
  },
};
