import type {
  MyBookHistoryService,
  RequestDeleteMyBookHistory,
  RequestGetMyBookHistory,
  RequestRegisterMyBookHistory,
  RequestUpdateMyBookHistory,
  ResponseDeleteMyBookHistory,
  ResponseGetMyBookHistory,
  ResponseRegisterMyBookHistory,
  ResponseUpdateMyBookHistory,
} from './types';

import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { isClient } from '@/lib/axios/constant';

let myBookHistoryServiceInstance: MyBookHistoryService | null = null;

export const createMyBookHistoryService = (): MyBookHistoryService => {
  if (isClient && myBookHistoryServiceInstance) {
    return myBookHistoryServiceInstance;
  }

  const client = axiosInstance;

  const service: MyBookHistoryService = {
    postMyBookHistory: async (payload: RequestRegisterMyBookHistory) => {
      const response = await client.post<ResponseRegisterMyBookHistory>(
        API_ENDPOINTS.MY_BOOK_HISTORY,
        payload
      );

      return response.data;
    },
    getMyBookHistory: async ({ myBookId }: RequestGetMyBookHistory) => {
      const response = await client.get<ResponseGetMyBookHistory>(
        `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookId}`
      );
      return response.data;
    },
    putMyBookHistory: async ({
      myBookHistoryId,
      ...payload
    }: RequestUpdateMyBookHistory) => {
      const response = await client.put<ResponseUpdateMyBookHistory>(
        `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`,
        payload
      );
      return response.data;
    },
    deleteMyBookHistory: async ({
      myBookHistoryId,
    }: RequestDeleteMyBookHistory) => {
      const response = await client.delete<ResponseDeleteMyBookHistory>(
        `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`
      );
      return response.data;
    },
  };

  if (isClient) {
    myBookHistoryServiceInstance = service;
  }
  return service;
};
