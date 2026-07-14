import { apiClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";

export interface DeleteMyBookService {
  deleteMyBook: (id: number) => Promise<void>;
}

export const deleteMyBookService: DeleteMyBookService = {
  deleteMyBook: async (id: number) => {
    await apiClient.delete<void>(`${API_ENDPOINTS.MY_BOOK.DEFAULT}/${id}`);
  }
}