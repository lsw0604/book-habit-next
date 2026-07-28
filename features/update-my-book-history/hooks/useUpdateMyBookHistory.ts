import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';
import { queryKeys } from '@/shared/query/keys';
import { type MyBookHistory, toMyBookHistoryViewModel } from '@/entities/my-book-history';

import { updateMyBookHistoryService } from '../api';
import type { UpdateMyBookHistoryPayload } from '../schema';



export const useUpdateMyBookHistory = (myBookId: number) => {
  const { updateMyBookHistory } = updateMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = queryKeys.myBookHistory.list(myBookId).queryKey;

  return useMutation<
    MyBookHistory,
    APIError,
    UpdateMyBookHistoryPayload,
    {
      previousHistories: MyBookHistory[];
    }
  >({
    mutationFn: async (payload: UpdateMyBookHistoryPayload) => {
      const response = await updateMyBookHistory(payload);
      return toMyBookHistoryViewModel(response);
    },
    onMutate: async (payload: UpdateMyBookHistoryPayload) => {
      await queryClient.cancelQueries({ queryKey: historiesQueryKey });

      const previousHistories =
        queryClient.getQueryData<MyBookHistory[]>(historiesQueryKey) ?? [];

      const newHistories = previousHistories.map(history =>
        history.id === payload.id ? { ...history, ...payload } : history
      );

      queryClient.setQueryData(historiesQueryKey, newHistories);

      return { previousHistories };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousHistories) {
        queryClient.setQueryData(historiesQueryKey, context.previousHistories);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: historiesQueryKey });
    },
  });
};
