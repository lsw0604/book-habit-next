import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query/keys';
import { type MyBookHistory, toMyBookHistoryViewModel } from '@/entities/my-book-history';

import { deleteMyBookHistoryService } from '../api';

export const useDeleteMyBookHistory = (myBookId: number) => {
  const { deleteMyBookHistory } = deleteMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = queryKeys.myBookHistory.list(myBookId).queryKey;

  return useMutation<
    MyBookHistory,
    AxiosError<ErrorDTO>,
    number,
    { previousHistories: MyBookHistory[] }
  >({
    mutationFn: async (myBookHistoryId: number) => {
      const response = await deleteMyBookHistory(myBookHistoryId);
      return toMyBookHistoryViewModel(response);
    },
    onMutate: async (myBookHistoryId: number) => {
      await queryClient.cancelQueries({ queryKey: historiesQueryKey });

      const previousHistories =
        queryClient.getQueryData<MyBookHistory[]>(historiesQueryKey) ?? [];

      queryClient.setQueryData<MyBookHistory[]>(
        historiesQueryKey,
        (oldHistories = []) =>
          oldHistories.filter(oldHistory => oldHistory.id !== myBookHistoryId)
      );

      return {
        previousHistories,
      };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(historiesQueryKey, context.previousHistories);
      }
    },
    onSettled: (_data, _error, _vars, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: historiesQueryKey });
      }
    },
  });
};
