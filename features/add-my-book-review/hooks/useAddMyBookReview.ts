import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { APIError } from "@/shared/api";
import {
  type MyBookReviewDTO,
  myBookReviewQueryKeys,
} from "@/entities/my-book-review";
import { myBookQueryKeys } from "@/entities/my-book";

import { addMyBookReviewService } from "../api"
import type { AddMyBookReviewType } from "../schema";

export const useAddMyBookReview = (myBookId: number, isbn?: string) => {
  const { addMyBookReview } = addMyBookReviewService;
  const queryClient = useQueryClient();
  const reviewDetailQueryKey = myBookReviewQueryKeys.detail(myBookId).queryKey;

  return useMutation<MyBookReviewDTO, APIError, AddMyBookReviewType, { previousReview: MyBookReviewDTO | null; optimisticId: number }>({
    mutationFn: async (payload: AddMyBookReviewType) => await addMyBookReview(payload),
    onMutate: async (payload: AddMyBookReviewType) => {
      await queryClient.cancelQueries({ queryKey: reviewDetailQueryKey });

      const previousReview = queryClient.getQueryData<MyBookReviewDTO>(reviewDetailQueryKey) ?? null;

      const now = new Date();
      const optimisticId = now.getTime();

      const optimisticDTO: MyBookReviewDTO = {
        id: optimisticId,
        myBookId,
        review: payload.review,
        isPublic: payload.isPublic,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        _count: {
          reviewComment: 0,
          reviewLike: 0
        }
      }

      queryClient.setQueryData<MyBookReviewDTO>(reviewDetailQueryKey, optimisticDTO)

      return { previousReview, optimisticId };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(reviewDetailQueryKey, context.previousReview);
      }
    },
    onSuccess: (newReview, _vars, _context) => {
      queryClient.setQueryData<MyBookReviewDTO>(reviewDetailQueryKey, newReview);

      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.detail(myBookId).queryKey, refetchType: 'all' });

      if (isbn) {
        queryClient.invalidateQueries({ queryKey: myBookQueryKeys.exist(isbn).queryKey, refetchType: 'all' });
      }
    },
    onSettled: (_data, _err, _vars, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: reviewDetailQueryKey });
      }
    }
  })
}