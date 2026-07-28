import { useQuery } from '@tanstack/react-query';

import { type APIError, useApiStatus } from '@/shared/api';
import { queryKeys } from '@/shared/query';

import { type MyBookReviewDTO, myBookReviewService } from '../api';
import { type MyBookReview, toMyBookReviewViewModel } from '../model';

export const useMyBookReview = (myBookId: number) => {
  const { getMyBookReview } = myBookReviewService;
  const { isInitialized } = useApiStatus();

  return useQuery<
    MyBookReviewDTO | null,
    APIError,
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
