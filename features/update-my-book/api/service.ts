import { MyBookDetailDTO, MyBookStatus } from "@/entities/my-book";
import { apiClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";

export interface UpdateMyBookService {
  updateMyBook: (payload: UpdateMyBookPayload) => Promise<MyBookDetailDTO>;
}

export interface UpdateMyBookPayload {
  id: number;
  status?: MyBookStatus;
  rating?: number;
}

export const updateMyBookService: UpdateMyBookService = {
  updateMyBook: async (payload: UpdateMyBookPayload) => {
    const { id, ...data } = payload;
    const response = await apiClient.patch<MyBookDetailDTO>(`${API_ENDPOINTS.MY_BOOK.DEFAULT}/${id}`, data);
    return response;
  }
}