import { MyBookHistoryDTO } from "@/entities/my-book-history";
import { API_ENDPOINTS, apiClient } from "@/shared/api";

export const deleteMyBookHistoryService = {
  deleteMyBookHistory: async (myBookHistoryId: number) => {
    const response = await apiClient.delete<MyBookHistoryDTO>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`
    );

    return response;
  },
}