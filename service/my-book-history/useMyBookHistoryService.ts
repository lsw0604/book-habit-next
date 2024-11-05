import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import MyBookHistoryService from './MyBookHistoryService';
import { queryKeys } from '@/queries/query-key';
import useMyBookHistoryUpdateCache from '@/hooks/my-book-history/useMyBookHistoryUpdateCache';

export function useMyBookHistory(myBookId: RequestGetMyBookHistory) {
  return useQuery<ResponseGetMyBookHistory, AxiosError<NestServerErrorType>>({
    queryKey: queryKeys.myBookHistory.list(myBookId).queryKey,
    queryFn: () => MyBookHistoryService.all(myBookId),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
}

export default function useMyBookHistoryMutation() {
  const {
    addMyBookHistoryQueryData,
    removeMyBookHistoryQueryData,
    updateMyBookHistoryQueryData,
  } = useMyBookHistoryUpdateCache();
  const addMyBookHistory = useMutation<
    ResponseRegisterMyBookHistory,
    AxiosError<NestServerErrorType>,
    RequestRegisterMyBookHistory
  >({
    mutationFn: (payload: RequestRegisterMyBookHistory) =>
      MyBookHistoryService.create(payload),
    onSuccess: addMyBookHistoryQueryData,
  });

  const updateMyBookHistory = useMutation<
    ResponseUpdateMyBookHistory,
    AxiosError<NestServerErrorType>,
    RequestUpdateMyBookHistory
  >({
    mutationFn: (payload: RequestUpdateMyBookHistory) =>
      MyBookHistoryService.update(payload),
    onSuccess: updateMyBookHistoryQueryData,
  });

  const removeMyBookHistory = useMutation<
    ResponseDeleteMyBookHistory,
    AxiosError<NestServerErrorType>,
    RequestDeleteMyBookHistory
  >({
    mutationFn: (payload: RequestDeleteMyBookHistory) =>
      MyBookHistoryService.remove(payload),
    onSuccess: removeMyBookHistoryQueryData,
  });

  return {
    addMyBookHistory,
    updateMyBookHistory,
    removeMyBookHistory,
  };
}
