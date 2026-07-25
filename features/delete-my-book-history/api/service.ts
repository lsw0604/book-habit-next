import { MyBookHistoryDTO } from "@/entities/my-book-history";
import { apiClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";

export const deleteMyBookHistoryService = {
  deleteMyBookHistory: async (myBookHistoryId: number) => {
    const response = await apiClient.delete<MyBookHistoryDTO>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`
    );

    return response;
  },
}