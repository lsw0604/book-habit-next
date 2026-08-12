import { API_ENDPOINTS, apiClient } from '@/shared/api';

export interface DeleteMyBookReviewService {
  deleteMyBookReview: (myBookReviewId: number) => Promise<void>;
}

export const deleteMyBookReviewService: DeleteMyBookReviewService = {
  deleteMyBookReview: async (myBookReviewId: number) =>
    apiClient.delete<void>(`${API_ENDPOINTS.MY_BOOK_REVIEW}/${myBookReviewId}`),
};
