import { apiClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";

import type { MyBookHistoryDTO } from "@/entities/my-book-history";
import type { AddMyBookHistoryType } from "../schema";

export const addMyBookHistoryService = {
  addMyBookHistory: async (payload: AddMyBookHistoryType) => {
    const { myBookId, date, startTime, endTime, ...rest } = payload;

    const apiPayload = {
      date: date.toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      ...rest,
    };

    const response = await apiClient.post<MyBookHistoryDTO>(
      `${API_ENDPOINTS.MY_BOOK_HISTORY}/${myBookId}`,
      apiPayload
    );

    return response;
  },
}