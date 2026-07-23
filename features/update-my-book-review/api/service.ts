import { MyBookReviewDTO } from "@/entities/my-book-review";
import { apiClient } from "@/shared/api/clients";
import { API_ENDPOINTS } from "@/shared/api/constant";
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