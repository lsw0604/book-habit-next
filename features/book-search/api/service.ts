import { API_ENDPOINTS, apiClient } from '@/shared/api';
import { BookSearchParams } from '../schema';

import type { BookSearchsDTO } from './book-search.dto';

export interface BookSearchService {
  searchBook: (
    payload: BookSearchParams & { page?: number }
  ) => Promise<BookSearchsDTO>;
}

export const bookSearchService: BookSearchService = {
  searchBook: async (payload: BookSearchParams & { page?: number }) => {
    const { query, page, size, sort, target } = payload;
    const response = await apiClient.get<BookSearchsDTO>(
      API_ENDPOINTS.SEARCH.KAKAO,
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

    return response;
  }
}