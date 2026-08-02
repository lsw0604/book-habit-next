import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';
import { type MyBookHistory, type MyBookHistoryDTO, myBookHistoryQueryKeys } from '@/entities/my-book-history';

import { updateMyBookHistoryService } from '../api';
import type { UpdateMyBookHistoryPayload } from '../schema';



export const useUpdateMyBookHistory = (myBookId: number) => {
  const { updateMyBookHistory } = updateMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = myBookHistoryQueryKeys.list(myBookId).queryKey;

  return useMutation<
    MyBookHistoryDTO,
    APIError,
    UpdateMyBookHistoryPayload,
    {
      previousHistories: MyBookHistory[];
    }
  >({
    mutationFn: async (payload: UpdateMyBookHistoryPayload) => await updateMyBookHistory(payload),
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
