import { MyBookReviewDTO } from "@/entities/my-book-review";
import { API_ENDPOINTS, apiClient } from "@/shared/api";

import { UpdateMyBookReviewType } from "../schema";

export interface UpdateMyBookReviewService {
  updateMyBookReview: (payload: UpdateMyBookReviewType & { myBookReviewId: number }) => Promise<MyBookReviewDTO>;
}

export const updateMyBookReviewService: UpdateMyBookReviewService = {
  updateMyBookReview: async (payload: UpdateMyBookReviewType & { myBookReviewId: number }) => {
    const { myBookReviewId, ...data } = payload;
    const response: MyBookReviewDTO = await apiClient.patch<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookReviewId}`,
      data
    );
    return response;
  },
}