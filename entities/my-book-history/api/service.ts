import { API_ENDPOINTS, apiClient } from '@/shared/api';

import type { MyBookHistoryDTO } from './my-book-history.dto';

export interface MyBookHistoryService {
  getMyBookHistories: (
    myBookId: number
  ) => Promise<MyBookHistoryDTO[]>;
}

export const myBookHistoryService: MyBookHistoryService = {
  getMyBookHistories: async (myBookId: number) => {
    const response = await apiClient.get<MyBookHistoryDTO[]>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}`,
      { params: { myBookId } }
    );

    return response;
  },
};
