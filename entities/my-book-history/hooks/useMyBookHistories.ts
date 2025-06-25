import type { AxiosError } from 'axios';
import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { type MyBookHistory, toMyBookHistoryViewModel } from '../model';
import {
  type GetMyBookHistoriesPayload,
  type MyBookHistoryDTO,
  myBookHistoryService,
} from '../api';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/query/keys';

export const useMyBookHistories = (payload: GetMyBookHistoriesPayload) => {
  const { myBookId } = payload;
  const { getMyBookHistories } = myBookHistoryService;

  return useQuery<
    MyBookHistoryDTO[],
    AxiosError<ErrorResponseDTO>,
    MyBookHistory[]
  >({
    queryKey: queryKeys.myBookHistory.list(myBookId).queryKey,
    queryFn: () => getMyBookHistories({ myBookId }),
    select: response => response.map(dto => toMyBookHistoryViewModel(dto)),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
