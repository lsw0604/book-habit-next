import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';
import { myBookHistoryQueryKeys, type MyBookHistory } from '@/entities/my-book-history';

import { deleteMyBookHistoryService } from '../api';

export const useDeleteMyBookHistory = (myBookId: number) => {
  const { deleteMyBookHistory } = deleteMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = myBookHistoryQueryKeys.list(myBookId).queryKey;

  return useMutation<
    void,
    APIError,
    number,
    { previousHistories: MyBookHistory[] }
  >({
    mutationFn: async (myBookHistoryId: number) => {
      await deleteMyBookHistory(myBookHistoryId);
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
