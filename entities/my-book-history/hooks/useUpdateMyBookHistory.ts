import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

import { type UpdateMyBookHistoryPayload, myBookHistoryService } from '../api';
import { type MyBookHistory, toMyBookHistoryViewModel } from '../model';

interface UseUpdateMyBookHistoryParams {
  myBookId: number;
}

export const useUpdateMyBookHistory = ({
  myBookId,
}: UseUpdateMyBookHistoryParams) => {
  const { updateMyBookHistory } = myBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = queryKeys.myBookHistory.list(myBookId).queryKey;

  return useMutation<
    MyBookHistory,
    AxiosError<ErrorResponseDTO>,
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
