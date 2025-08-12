import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import { ResponseSearchDTO } from './book.dto';
import { BookService, SearchPayload } from './types';

export const bookService: BookService = {
  search: async (payload: SearchPayload) => {
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
