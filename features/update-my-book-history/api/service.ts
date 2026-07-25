import { MyBookHistoryDTO } from "@/entities/my-book-history";
import { apiClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";

import type { UpdateMyBookHistoryPayload } from "../schema";

export const updateMyBookHistoryService = {
  updateMyBookHistory: async (payload: UpdateMyBookHistoryPayload) => {
    const { startTime, endTime, id: myBookHistoryId, ...rest } = payload;

    const apiPayload = {
      startTime: startTime ? startTime.toISOString() : undefined,
      endTime: endTime ? endTime.toISOString() : undefined,
      ...rest,
    };

    const response = await apiClient.patch<MyBookHistoryDTO>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookHistoryId}`,
      apiPayload
    );

    return response;
  },
}