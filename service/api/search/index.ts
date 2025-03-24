import type {
  ResponseSearchBook,
  RequestSearchBook,
  SearchService,
} from './types';

import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { isClient } from '@/lib/axios/constant';

let searchServiceInstance: SearchService | null = null;

export const createSearchService = (): SearchService => {
  if (isClient && searchServiceInstance) {
    return searchServiceInstance;
  }

  const client = axiosInstance;

  const service: SearchService = {
    searchBook: async ({
      query,
      page = 1,
      size = 10,
      sort = 'accuracy',
      target = 'title',
    }: RequestSearchBook) => {
      const response = await client.get<ResponseSearchBook>(
        API_ENDPOINTS.SEARCH,
        {
          params: {
            query,
            page,
            size,
            sort,
            target,
          },
        }
      );

      return response.data;
    },
  };

  if (isClient) {
    searchServiceInstance = service;
  }

  return service;
};

export const searchService = (): SearchService => {
  return createSearchService();
};
