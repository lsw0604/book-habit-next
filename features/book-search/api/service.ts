import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type { BookSearchRequestParams, BookSearchService } from './types';

import type { BookSearchsDTO } from './book-search.dto';

export const bookSearchService: BookSearchService = {
  searchBook: async (payload: BookSearchRequestParams) => {
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