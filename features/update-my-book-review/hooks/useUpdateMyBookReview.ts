import { useMutation, useQueryClient } from '@tanstack/react-query';

import { myBookQueryKeys } from '@/entities/my-book';
import {
  type MyBookReviewDTO,
  myBookReviewQueryKeys,
} from '@/entities/my-book-review';
import { APIError } from '@/shared/api';

import { updateMyBookReviewService } from '../api';
import type { UpdateMyBookReviewType } from '../schema';

export const useUpdateMyBookReview = (myBookId: number, myBookReviewId: number) => {
  const { updateMyBookReview } = updateMyBookReviewService;
  const queryClient = useQueryClient();
  const reviewDetailQueryKey = myBookReviewQueryKeys.detail(myBookId).queryKey;

  return useMutation<
    MyBookReviewDTO,
    APIError,
    UpdateMyBookReviewType,
    { previousReview: MyBookReviewDTO | undefined }
  >({
    mutationFn: (payload: UpdateMyBookReviewType) =>
      updateMyBookReview({
        ...payload,
        myBookReviewId,
      }),
    onMutate: async (payload: UpdateMyBookReviewType) => {
      await queryClient.cancelQueries({ queryKey: reviewDetailQueryKey });

      const previousReview =
        queryClient.getQueryData<MyBookReviewDTO>(reviewDetailQueryKey);

      if (previousReview) {
        // 캐시는 DTO를 담으므로 낙관적 값도 DTO 형태여야 한다 (날짜는 Date가 아니라 ISO 문자열)
        queryClient.setQueryData<MyBookReviewDTO>(reviewDetailQueryKey, {
          ...previousReview,
          review: payload.review,
          isPublic: payload.isPublic,
          updatedAt: new Date().toISOString(),
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
      queryClient.setQueryData<MyBookReviewDTO>(reviewDetailQueryKey, updatedReview);
      queryClient.invalidateQueries({
        queryKey: myBookQueryKeys.detail(myBookId).queryKey,
      });
    },
  });
};
