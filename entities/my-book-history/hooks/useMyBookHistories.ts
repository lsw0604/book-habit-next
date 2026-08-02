import { useQuery } from '@tanstack/react-query';

import { type APIError, useApiStatus } from '@/shared/api';

import type { MyBookHistory } from '../model';
import { myBookHistoryQueryKeys, myBookHistoryService, type MyBookHistoryDTO } from '../api';
import { toMyBookHistoryViewModel } from '../lib';

export const useMyBookHistories = (myBookId: number) => {
  const { getMyBookHistories } = myBookHistoryService;
  const { isInitialized } = useApiStatus();

  return useQuery<MyBookHistoryDTO[], APIError, MyBookHistory[]>({
    queryKey: myBookHistoryQueryKeys.list(myBookId).queryKey,
    queryFn: () => getMyBookHistories(myBookId),
    select: response => response.map(dto => toMyBookHistoryViewModel(dto)),
    enabled: isInitialized && !!myBookId,
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
