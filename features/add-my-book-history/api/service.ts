import type { MyBookHistoryDTO } from '@/entities/my-book-history';
import { API_ENDPOINTS, apiClient } from '@/shared/api';

import type { AddMyBookHistoryType } from '../schema';

export const addMyBookHistoryService = {
  addMyBookHistory: async (payload: AddMyBookHistoryType) => {
    const { date, startTime, endTime, ...rest } = payload;

    // myBookId도 생성될 기록의 속성이므로 본문에 함께 싣는다.
    const apiPayload = {
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      ...rest,
    };

    const response = await apiClient.post<MyBookHistoryDTO>(
      API_ENDPOINTS.MY_BOOK_HISTORY,
      apiPayload
    );

    return response;
  },
};
