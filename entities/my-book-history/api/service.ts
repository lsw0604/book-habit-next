import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import { MyBookHistoryDTO } from './my-book-history.dto';

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
