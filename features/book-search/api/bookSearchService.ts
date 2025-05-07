import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';
import { BookSearchService, ResponseSearch, SearchPayload } from './types';

export const bookSearchService: BookSearchService = {
  search: async ({
    query,
    page,
    size,
    sort,
    target,
  }: SearchPayload): Promise<ResponseSearch> => {
    const response: ResponseSearch = await apiClient.get<ResponseSearch>(
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
