import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

import { type DeleteMyBookHistoryPayload, myBookHistoryService } from '../api';
import { type MyBookHistory, toMyBookHistoryViewModel } from '../model';

interface UseDeleteMyBookHistory {
  myBookId: number;
}

export const useDeleteMyBookHistory = ({
  myBookId,
}: UseDeleteMyBookHistory) => {
  const { deleteMyBookHistory } = myBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = queryKeys.myBookHistory.list(myBookId).queryKey;

  return useMutation<
    MyBookHistory,
    AxiosError<ErrorResponseDTO>,
    DeleteMyBookHistoryPayload,
    { previousHistories: MyBookHistory[] }
  >({
    mutationFn: async (payload: DeleteMyBookHistoryPayload) => {
      const response = await deleteMyBookHistory(payload);
      return toMyBookHistoryViewModel(response);
    },
    onMutate: async (payload: DeleteMyBookHistoryPayload) => {
      await queryClient.cancelQueries({ queryKey: historiesQueryKey });

      const previousHistories =
        queryClient.getQueryData<MyBookHistory[]>(historiesQueryKey) ?? [];

      queryClient.setQueryData<MyBookHistory[]>(
        historiesQueryKey,
        (oldHistories = []) =>
          oldHistories.filter(oldHistory => oldHistory.id !== payload.id)
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
