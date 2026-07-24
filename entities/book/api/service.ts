import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type { BookDetailDTO } from './book.dto';

export interface BookService {
  fetchBookDetail: (isbn: string) => Promise<BookDetailDTO>;
  findOrCreate: (isbn: string) => Promise<BookDetailDTO>;
}

export const bookService: BookService = {
  fetchBookDetail: async (isbn: string) => {
    const response = await apiClient.get<BookDetailDTO>(
      `${API_ENDPOINTS.SEARCH.ALADIN}/${isbn}`
    );
    return response;
  },
  findOrCreate: async (isbn: string) => {
    const response = await apiClient.post<BookDetailDTO>(
      API_ENDPOINTS.BOOK.FIND_OR_CREATE,
      { body: isbn }
    );

    return response;
  },
};
