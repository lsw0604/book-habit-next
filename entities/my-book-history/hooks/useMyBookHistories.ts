import { useQuery } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';

import { myBookHistoryQueryKeys, myBookHistoryService, type MyBookHistoryDTO } from '../api';
import { toMyBookHistoryViewModel } from '../lib';
import type { MyBookHistory } from '../model';

export const useMyBookHistories = (myBookId: number) => {
  const { getMyBookHistories } = myBookHistoryService;

  return useQuery<MyBookHistoryDTO[], APIError, MyBookHistory[]>({
    queryKey: myBookHistoryQueryKeys.list(myBookId).queryKey,
    queryFn: () => getMyBookHistories(myBookId),
    select: response => response.map(dto => toMyBookHistoryViewModel(dto)),
    enabled: !!myBookId,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
