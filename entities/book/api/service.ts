import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type { ResponseSearchDTO, BookDTO } from './book.dto';
import type {
  BookService,
  BookSearchPayload,
  FindOrCreatePayload,
} from './types';

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
  findOrCreate: async (payload: FindOrCreatePayload) => {
    const response = await apiClient.post<BookDTO>(
      API_ENDPOINTS.BOOK.FIND_OR_CREATE,
      payload
    );

    return response;
  },
};
