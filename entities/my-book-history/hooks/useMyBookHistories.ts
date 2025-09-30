import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query/keys';

import {
  type GetMyBookHistoriesPayload,
  type MyBookHistoryDTO,
  myBookHistoryService,
} from '../api';
import { type MyBookHistory, toMyBookHistoryViewModel } from '../model';

export const useMyBookHistories = (payload: GetMyBookHistoriesPayload) => {
  const { myBookId } = payload;
  const { getMyBookHistories } = myBookHistoryService;

  return useQuery<MyBookHistoryDTO[], AxiosError<ErrorDTO>, MyBookHistory[]>({
    queryKey: queryKeys.myBookHistory.list(myBookId).queryKey,
    queryFn: () => getMyBookHistories({ myBookId }),
    select: response => response.map(dto => toMyBookHistoryViewModel(dto)),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
