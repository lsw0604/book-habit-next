import { API_ENDPOINTS, apiClient, type RequestOptions } from '@/shared/api';

import type { MyBookReviewDTO } from './my-book-review.dto';

/**
 * options는 서버 컴포넌트에서 쿠키를 실어 보내기 위한 통로다.
 * @see shared/api/server/withServerAuth
 */
export interface MyBookReviewService {
  getMyBookReview: (
    myBookId: number,
    options?: RequestOptions
  ) => Promise<MyBookReviewDTO>;
}

export const myBookReviewService: MyBookReviewService = {
  getMyBookReview: async (myBookId, options) => {
    const response: MyBookReviewDTO = await apiClient.get<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`,
      options
    );
    return response;
  },
};
