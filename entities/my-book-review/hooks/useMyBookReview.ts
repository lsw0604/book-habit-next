import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query';

import { type MyBookReviewDTO, myBookReviewService } from '../api';
import { toMyBookReviewViewModel } from '../model/my-book-review.mapper';
import type { MyBookReview } from '../model/my-book-review.model';

export const useMyBookReview = (myBookId: number) => {
  const { getMyBookReview } = myBookReviewService;

  return useQuery<MyBookReviewDTO, AxiosError<ErrorDTO>, MyBookReview>({
    queryKey: queryKeys.myBookReview.detail(myBookId).queryKey,
    queryFn: () => getMyBookReview(myBookId),
    select: response => toMyBookReviewViewModel(response),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
