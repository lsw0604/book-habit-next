import { MyBookReviewDTO } from "@/entities/my-book-review";
import { apiClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";
import { AddMyBookReviewType } from "../schema";

export interface AddMyBookReviewService {
  addMyBookReview: (payload: AddMyBookReviewType) => Promise<MyBookReviewDTO>;
}

export const addMyBookReviewService: AddMyBookReviewService = {
  addMyBookReview: async (payload: AddMyBookReviewType) => {
    const { myBookId, ...data } = payload;
    const response: MyBookReviewDTO = await apiClient.post<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`,
      data
    );
    return response;
  },
}