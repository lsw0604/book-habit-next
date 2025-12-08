import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type {
  ResponseKakaoDTO,
  ResponseAladinDTO,
  BookDetailDTO,
} from './book.dto';
import type { BookService, KakaoPayload } from './types';

export const bookService: BookService = {
  kakaoSearch: async (payload: KakaoPayload) => {
    const { query, page, size, sort, target } = payload;
    const response = await apiClient.get<ResponseKakaoDTO>(
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
  },
  aladinSearch: async (isbn: string) => {
    const response = await apiClient.get<ResponseAladinDTO>(
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
