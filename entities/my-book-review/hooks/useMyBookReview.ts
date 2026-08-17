import { useQuery } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';

import { type MyBookReviewDTO, myBookReviewQueryKeys, myBookReviewService } from '../api';
import { toMyBookReviewViewModel } from '../lib';
import type { MyBookReview } from '../model';

/**
 * 모듈 레벨에 두어 참조를 고정한다.
 * 인라인 화살표를 넘기면 렌더마다 새 함수가 되어 TanStack Query가 이전 select 결과를
 * 재사용하지 못하고, 매번 새 객체를 만들어 불필요한 리렌더를 유발한다.
 */
const selectMyBookReview = (response: MyBookReviewDTO | null) =>
  response ? toMyBookReviewViewModel(response) : null;

export const useMyBookReview = (myBookId: number) => {
  const { getMyBookReview } = myBookReviewService;

  return useQuery<MyBookReviewDTO | null, APIError, MyBookReview | null>({
    queryKey: myBookReviewQueryKeys.detail(myBookId).queryKey,
    queryFn: () => getMyBookReview(myBookId),
    select: selectMyBookReview,
    enabled: !!myBookId,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
