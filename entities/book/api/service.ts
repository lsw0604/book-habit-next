import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type { BookDetailDTO } from './book.dto';
import type { BookService } from './types';

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
      isbn
    );

    return response;
  },
};
