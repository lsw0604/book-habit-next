import { useQuery } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';

import { type MyBookReviewDTO, myBookReviewQueryKeys, myBookReviewService } from '../api';
import { toMyBookReviewViewModel } from '../lib';
import type { MyBookReview } from '../model';

export const useMyBookReview = (myBookId: number) => {
  const { getMyBookReview } = myBookReviewService;

  return useQuery<MyBookReviewDTO | null, APIError, MyBookReview | null>({
    queryKey: myBookReviewQueryKeys.detail(myBookId).queryKey,
    queryFn: () => getMyBookReview(myBookId),
    select: response => (response ? toMyBookReviewViewModel(response) : null),
    enabled: !!myBookId,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
