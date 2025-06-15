import type {
  MyBookReview,
  MyBookReviewService,
  CreateMyBookReviewPayload,
  UpdateMyBookReviewPayload,
  ResponseDeleteMyBookReview,
} from './types';
import { apiClient } from '@/shared/api/clients';
import { API_ENDPOINTS } from '@/shared/api/constant';

export const myBookReviewService: MyBookReviewService = {
  addMyBookReview: async (
    payload: CreateMyBookReviewPayload
  ): Promise<MyBookReview> => {
    const { myBookId, ...data } = payload;
    const response: MyBookReview = await apiClient.post<MyBookReview>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`,
      data
    );
    return response;
  },
  getMyBookReview: async (myBookId: number): Promise<MyBookReview> => {
    const response: MyBookReview = await apiClient.get<MyBookReview>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookId}`
    );
    return response;
  },
  updateMyBookReview: async (
    payload: UpdateMyBookReviewPayload
  ): Promise<MyBookReview> => {
    const { myBookReviewId, ...data } = payload;
    const response: MyBookReview = await apiClient.patch<MyBookReview>(
      `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookReviewId}`,
      data
    );
    return response;
  },
  deleteMyBookReview: async (
    myBookReviewId: number
  ): Promise<ResponseDeleteMyBookReview> => {
    const response: ResponseDeleteMyBookReview =
      await apiClient.delete<ResponseDeleteMyBookReview>(
        `${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookReviewId}`
      );
    return response;
  },
};
