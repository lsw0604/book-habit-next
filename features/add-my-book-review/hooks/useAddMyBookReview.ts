import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMyBookReviewService } from "../api"
import { queryKeys } from "@/shared/query";
import { MyBookReview, MyBookReviewDTO, toMyBookReviewViewModel } from "@/entities/my-book-review";
import { APIError } from "@/shared/api/errors";
import { AddMyBookReviewType } from "../schema";

export const useAddMyBookReview = (myBookId: number, isbn?: string) => {
  const { addMyBookReview } = addMyBookReviewService;
  const queryClient = useQueryClient();
  const reviewDetailQueryKey = queryKeys.myBookReview.detail(myBookId).queryKey;

  return useMutation<MyBookReview, APIError, AddMyBookReviewType, { previousReview: MyBookReview | null; optimisticId: number }>({
    mutationFn: async (payload: AddMyBookReviewType) => {
      const response = await addMyBookReview(payload);
      return toMyBookReviewViewModel(response);
    },
    onMutate: async (payload: AddMyBookReviewType) => {
      await queryClient.cancelQueries({ queryKey: reviewDetailQueryKey });

      const previousReview = queryClient.getQueryData<MyBookReview>(reviewDetailQueryKey) ?? null;

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

      const optimisticReview = toMyBookReviewViewModel(optimisticDTO);

      queryClient.setQueryData<MyBookReview>(reviewDetailQueryKey, optimisticReview)

      return { previousReview, optimisticId };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(reviewDetailQueryKey, context.previousReview);
      }
    },
    onSuccess: (newReview, _vars, _context) => {
      queryClient.setQueryData<MyBookReview>(reviewDetailQueryKey, newReview);

      queryClient.invalidateQueries({ queryKey: queryKeys.myBook.detail(myBookId).queryKey, refetchType: 'all' });

      if (isbn) {
        queryClient.invalidateQueries({ queryKey: queryKeys.myBook.exist(isbn).queryKey, refetchType: 'all' });
      }
    },
    onSettled: (_data, _err, _vars, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: reviewDetailQueryKey });
      }
    }
  })
}