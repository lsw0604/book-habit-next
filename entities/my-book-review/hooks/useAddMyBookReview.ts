import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query';

import {
  type CreateMyBookReviewPayload,
  type MyBookReviewDTO,
  myBookReviewService,
} from '../api';
import { type MyBookReview, toMyBookReviewViewModel } from '../model';

export const useAddMyBookReview = (myBookId: number) => {
  const { addMyBookReview } = myBookReviewService;
  const queryClient = useQueryClient();
  const reviewDetailQueryKey = queryKeys.myBookReview.detail(myBookId).queryKey;

  return useMutation<
    MyBookReview,
    AxiosError<ErrorDTO>,
    CreateMyBookReviewPayload,
    { previousReview: MyBookReview | null; optimisticId: number }
  >({
    mutationFn: async (payload: CreateMyBookReviewPayload) => {
      const response = await addMyBookReview(payload);
      return toMyBookReviewViewModel(response);
    },
    onMutate: async (payload: CreateMyBookReviewPayload) => {
      await queryClient.cancelQueries({ queryKey: reviewDetailQueryKey });

      const previousReview =
        queryClient.getQueryData<MyBookReview>(reviewDetailQueryKey) ?? null;

      const now = new Date();
      const optimisticDTO: MyBookReviewDTO = {
        id: now.getTime(),
        myBookId,
        review: payload.review,
        isPublic: payload.isPublic,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        _count: {
          reviewLike: 0,
          reviewComment: 0,
        },
      };

      const optimisticNewReview = toMyBookReviewViewModel(optimisticDTO);

      queryClient.setQueryData<MyBookReview>(
        reviewDetailQueryKey,
        optimisticNewReview
      );

      return { previousReview, optimisticId: optimisticNewReview.id };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(reviewDetailQueryKey, context.previousReview);
      }
    },
    onSuccess: (realNewReview, _vars, _context) => {
      queryClient.setQueryData<MyBookReview>(
        reviewDetailQueryKey,
        realNewReview
      );
    },
    onSettled: (_data, _err, _vars, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: reviewDetailQueryKey });
      }
    },
  });
};
