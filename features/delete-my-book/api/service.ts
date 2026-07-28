import { API_ENDPOINTS, apiClient } from "@/shared/api";

export interface DeleteMyBookService {
  deleteMyBook: (id: number) => Promise<void>;
}

export const deleteMyBookService: DeleteMyBookService = {
  deleteMyBook: async (id: number) => {
    await apiClient.delete<void>(`${API_ENDPOINTS.MY_BOOK.DEFAULT}/${id}`);
  }
}