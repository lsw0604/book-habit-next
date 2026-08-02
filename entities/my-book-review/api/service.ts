import { API_ENDPOINTS, apiClient } from '@/shared/api';

import type { MyBookReviewDTO } from './my-book-review.dto';

export interface MyBookReviewService {
  getMyBookReview: (myBookId: number) => Promise<MyBookReviewDTO>
}

export const myBookReviewService: MyBookReviewService = {
  getMyBookReview: async (myBookId: number) => {
    const response: MyBookReviewDTO = await apiClient.get<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`
    );
    return response;
  },
};
