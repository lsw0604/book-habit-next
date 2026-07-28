import { API_ENDPOINTS, apiClient } from "@/shared/api";

import { MyBookReviewDTO } from "@/entities/my-book-review";

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