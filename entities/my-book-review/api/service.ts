import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

import type { MyBookReviewDTO } from './my-book-review.dto';
import type {
  CreateMyBookReviewPayload,
  UpdateMyBookReviewPayload,
  ResponseDeleteMyBookReview,
  MyBookReviewService,
} from './types';

export const myBookReviewService: MyBookReviewService = {
  getMyBookReview: async (myBookId: number) => {
    const response: MyBookReviewDTO = await apiClient.get<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`
    );
    return response;
  },
  addMyBookReview: async (payload: CreateMyBookReviewPayload) => {
    const { myBookId, ...data } = payload;
    const response: MyBookReviewDTO = await apiClient.post<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`,
      data
    );
    return response;
  },
  updateMyBookReview: async (payload: UpdateMyBookReviewPayload) => {
    const { myBookReviewId, ...data } = payload;
    const response: MyBookReviewDTO = await apiClient.patch<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookReviewId}`,
      data
    );
    return response;
  },
  deleteMyBookReview: async (myBookReviewId: number) => {
    const response: ResponseDeleteMyBookReview =
      await apiClient.delete<ResponseDeleteMyBookReview>(
        `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookReviewId}`
      );
    return response;
  },
};
