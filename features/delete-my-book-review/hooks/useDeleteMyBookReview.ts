import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myBookQueryKeys } from '@/entities/my-book';
import { MyBookReview, myBookReviewQueryKeys } from '@/entities/my-book-review';
import type { APIError } from '@/shared/api';

import { deleteMyBookReviewService } from '../api';

export const useDeleteMyBookReview = (myBookId: number) => {
  const { deleteMyBookReview } = deleteMyBookReviewService;
  const queryClient = useQueryClient();
  const reviewDetailQueryKey = myBookReviewQueryKeys.detail(myBookId).queryKey;

  return useMutation<
    void,
    APIError,
    number, // myBookReviewId
    { previousReview: MyBookReview | null | undefined } // Context Type
  >({
    mutationFn: (myBookReviewId: number) => deleteMyBookReview(myBookReviewId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: reviewDetailQueryKey });

      const previousReview = queryClient.getQueryData<MyBookReview | null>(
        reviewDetailQueryKey
      );

      // 캐시 데이터가 있으면 null로 임시 설정 (낙관적 업데이트)
      queryClient.setQueryData(reviewDetailQueryKey, null);

      return { previousReview };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(reviewDetailQueryKey, context.previousReview);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewDetailQueryKey });
      queryClient.invalidateQueries({
        queryKey: myBookQueryKeys.detail(myBookId).queryKey,
      });
    },
  });
};
