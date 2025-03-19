import type {
  MyBookTagService,
  RequestDeleteMyBookTag,
  RequestPostMyBookTag,
  ResponseDeleteMyBookTag,
  ResponsePostMyBookTag,
} from './types';

import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { isClient } from '@/lib/axios/constant';

let myBookTagServiceInstance: MyBookTagService | null = null;

export const createMyBookTagService = (): MyBookTagService => {
  if (isClient && myBookTagServiceInstance) {
    return myBookTagServiceInstance;
  }

  const client = axiosInstance;

  const service: MyBookTagService = {
    postMyBookTag: async (payload: RequestPostMyBookTag) => {
      const response = await client.post<ResponsePostMyBookTag>(
        API_ENDPOINTS.MY_BOOK_TAG,
        payload
      );

      return response.data;
    },
    deleteMyBookTag: async ({ myBookTagId }: RequestDeleteMyBookTag) => {
      const response = await client.delete<ResponseDeleteMyBookTag>(
        `${API_ENDPOINTS.MY_BOOK_TAG}/${myBookTagId}`
      );
      return response.data;
    },
  };

  if (isClient) {
    myBookTagServiceInstance = service;
  }

  return service;
};

export const myBookTagService = (): MyBookTagService => {
  return createMyBookTagService();
};
