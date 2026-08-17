import { useQuery } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';

import { myBookHistoryQueryKeys, myBookHistoryService, type MyBookHistoryDTO } from '../api';
import { toMyBookHistoryViewModel } from '../lib';
import type { MyBookHistory } from '../model';

/**
 * 모듈 레벨에 두어 참조를 고정한다.
 * 인라인 화살표는 렌더마다 새 함수가 되어 TanStack Query가 이전 결과를 재사용하지 못하고,
 * 데이터가 그대로여도 목록 전체를 다시 변환한다.
 */
const selectMyBookHistories = (response: MyBookHistoryDTO[]) =>
  response.map(dto => toMyBookHistoryViewModel(dto));

export const useMyBookHistories = (myBookId: number) => {
  const { getMyBookHistories } = myBookHistoryService;

  return useQuery<MyBookHistoryDTO[], APIError, MyBookHistory[]>({
    queryKey: myBookHistoryQueryKeys.list(myBookId).queryKey,
    queryFn: () => getMyBookHistories(myBookId),
    select: selectMyBookHistories,
    enabled: !!myBookId,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
