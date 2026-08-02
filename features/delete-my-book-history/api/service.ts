import { API_ENDPOINTS, apiClient } from "@/shared/api";

export interface DeleteMyBookHistoryService {
  deleteMyBookHistory: (id: number) => Promise<void>;
}

export const deleteMyBookHistoryService: DeleteMyBookHistoryService = {
  deleteMyBookHistory: async (id: number) => {
    await apiClient.delete<void>(`${API_ENDPOINTS.MY_BOOK_HISTORY}/${id}`);
  },
}