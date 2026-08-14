import type { AxiosRequestConfig } from 'axios';

import { API_ENDPOINTS, apiClient } from '@/shared/api';

import type { MyBookReviewDTO } from './my-book-review.dto';

/**
 * config는 서버 컴포넌트에서 쿠키를 실어 보내기 위한 통로다.
 * @see shared/api/server/withServerAuth
 */
export interface MyBookReviewService {
  getMyBookReview: (
    myBookId: number,
    config?: AxiosRequestConfig
  ) => Promise<MyBookReviewDTO>;
}

export const myBookReviewService: MyBookReviewService = {
  getMyBookReview: async (myBookId, config) => {
    const response: MyBookReviewDTO = await apiClient.get<MyBookReviewDTO>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`,
      config
    );
    return response;
  },
};
