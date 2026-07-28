import { MyBookHistoryDTO } from "@/entities/my-book-history";
import { API_ENDPOINTS, apiClient } from "@/shared/api";

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