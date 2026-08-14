import type { AxiosRequestConfig } from 'axios';

import { API_ENDPOINTS, apiClient } from '@/shared/api';

import type { MyBookHistoryDTO } from './my-book-history.dto';

/**
 * config는 서버 컴포넌트에서 쿠키를 실어 보내기 위한 통로다.
 * @see shared/api/server/withServerAuth
 */
export interface MyBookHistoryService {
  getMyBookHistories: (
    myBookId: number,
    config?: AxiosRequestConfig
  ) => Promise<MyBookHistoryDTO[]>;
}

export const myBookHistoryService: MyBookHistoryService = {
  getMyBookHistories: async (myBookId, config) => {
    const response = await apiClient.get<MyBookHistoryDTO[]>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}`,
      { ...config, params: { myBookId } }
    );

    return response;
  },
};
