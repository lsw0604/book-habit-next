import { useQuery } from '@tanstack/react-query';

import { type APIError, useApiStatus } from '@/shared/api';
import { queryKeys } from '@/shared/query/keys';

import { type MyBookHistoryDTO, myBookHistoryService } from '../api';
import { toMyBookHistoryViewModel } from '../lib';
import type { MyBookHistory } from '../model';

export const useMyBookHistories = (myBookId: number) => {
  const { getMyBookHistories } = myBookHistoryService;
  const { isInitialized } = useApiStatus();

  return useQuery<MyBookHistoryDTO[], APIError, MyBookHistory[]>({
    queryKey: queryKeys.myBookHistory.list(myBookId).queryKey,
    queryFn: () => getMyBookHistories(myBookId),
    select: response => response.map(dto => toMyBookHistoryViewModel(dto)),
    enabled: isInitialized,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
