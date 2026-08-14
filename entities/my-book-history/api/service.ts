import { API_ENDPOINTS, apiClient, type RequestOptions } from '@/shared/api';

import type { MyBookHistoryDTO } from './my-book-history.dto';

/**
 * options는 서버 컴포넌트에서 쿠키를 실어 보내기 위한 통로다.
 * @see shared/api/server/withServerAuth
 */
export interface MyBookHistoryService {
  getMyBookHistories: (
    myBookId: number,
    options?: RequestOptions
  ) => Promise<MyBookHistoryDTO[]>;
}

export const myBookHistoryService: MyBookHistoryService = {
  getMyBookHistories: async (myBookId, options) => {
    const response = await apiClient.get<MyBookHistoryDTO[]>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}`,
      { ...options, params: { myBookId } }
    );

    return response;
  },
};
