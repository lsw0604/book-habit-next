import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type { ResponseSearchDTO } from './book.dto';
import type { BookService, BookSearchPayload } from './types';

export const bookService: BookService = {
  search: async (payload: BookSearchPayload) => {
    const { query, page, size, sort, target } = payload;
    const response = await apiClient.get<ResponseSearchDTO>(
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

    return response;
  },
};
