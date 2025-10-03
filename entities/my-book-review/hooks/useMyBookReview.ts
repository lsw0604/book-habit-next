import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { useApiStatus } from '@/shared/api/hooks';
import { queryKeys } from '@/shared/query';

import { type MyBookReviewDTO, myBookReviewService } from '../api';
import { toMyBookReviewViewModel } from '../model/my-book-review.mapper';
import type { MyBookReview } from '../model/my-book-review.model';

export const useMyBookReview = (myBookId: number) => {
  const { getMyBookReview } = myBookReviewService;
  const { isInitialized } = useApiStatus();

  return useQuery<
    MyBookReviewDTO | null,
    AxiosError<ErrorDTO>,
    MyBookReview | null
  >({
    queryKey: queryKeys.myBookReview.detail(myBookId).queryKey,
    queryFn: () => getMyBookReview(myBookId),
    select: response => (response ? toMyBookReviewViewModel(response) : null),
    enabled: isInitialized,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
