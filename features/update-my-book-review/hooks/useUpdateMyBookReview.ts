import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type MyBookReview,
  type MyBookReviewDTO,
  toMyBookReviewViewModel,
} from '@/entities/my-book-review';
import { APIError } from '@/shared/api/errors';
import { queryKeys } from '@/shared/query';

import { updateMyBookReviewService } from '../api';
import type { UpdateMyBookReviewType } from '../schema';

export const useUpdateMyBookReview = (myBookId: number, myBookReviewId: number) => {
  const { updateMyBookReview } = updateMyBookReviewService;
  const queryClient = useQueryClient();
  const reviewDetailQueryKey = queryKeys.myBookReview.detail(myBookId).queryKey;

  return useMutation<
    MyBookReview,
    APIError,
    UpdateMyBookReviewType,
    { previousReview: MyBookReview | undefined }
  >({
    mutationFn: async (payload: UpdateMyBookReviewType) => {
      const response: MyBookReviewDTO = await updateMyBookReview({
        ...payload,
        myBookReviewId,
      });
      return toMyBookReviewViewModel(response);
    },
    onMutate: async (payload: UpdateMyBookReviewType) => {
      await queryClient.cancelQueries({ queryKey: reviewDetailQueryKey });

      const previousReview = queryClient.getQueryData<MyBookReview>(reviewDetailQueryKey);

      if (previousReview) {
        queryClient.setQueryData<MyBookReview>(reviewDetailQueryKey, {
          ...previousReview,
          review: payload.review,
          isPublic: payload.isPublic,
          updatedAt: new Date(),
        });
      }

      return { previousReview };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousReview) {
        queryClient.setQueryData(reviewDetailQueryKey, context.previousReview);
      }
    },
    onSuccess: (updatedReview) => {
      // PATCH 성공 시 서버가 반환한 최신 데이터로 캐시를 동기화합니다 (추가 GET 요청 방지)
      queryClient.setQueryData<MyBookReview>(reviewDetailQueryKey, updatedReview);
      queryClient.invalidateQueries({
        queryKey: queryKeys.myBook.detail(myBookId).queryKey,
      });
    },
  });
};
