import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';
import { myBookHistoryQueryKeys, toMyBookHistoryViewModel, type MyBookHistory, type MyBookHistoryDTO } from '@/entities/my-book-history';

import type { AddMyBookHistoryType } from '../schema';
import { addMyBookHistoryService } from '../api';

interface UseAddMyBookHistoryParams {
  myBookId: number;
}

export const useAddMyBookHistory = ({
  myBookId,
}: UseAddMyBookHistoryParams) => {
  const { addMyBookHistory } = addMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = myBookHistoryQueryKeys.list(myBookId).queryKey;

  return useMutation<
    MyBookHistory,
    APIError,
    AddMyBookHistoryType,
    {
      previousHistories: MyBookHistory[];
      optimisticId: number;
    }
  >({
    mutationFn: async (payload: AddMyBookHistoryType) => {
      const response = await addMyBookHistory(payload);
      return toMyBookHistoryViewModel(response);
    },
    onMutate: async (payload: AddMyBookHistoryType) => {
      await queryClient.cancelQueries({ queryKey: historiesQueryKey });

      const previousHistories =
        queryClient.getQueryData<MyBookHistory[]>(historiesQueryKey) ?? [];

      const now = new Date();
      const optimisticDTO: MyBookHistoryDTO = {
        id: now.getTime(),
        myBookId: payload.myBookId,
        startPage: payload.startPage,
        endPage: payload.endPage,
        startTime: (payload.startTime || now).toISOString(),
        endTime: (payload.endTime || now).toISOString(),
        date: (payload.date || now).toISOString(),
        readingMinutes: payload.readingMinutes,
        memo: payload.memo || null,
        readingMood: payload.readingMood,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      const optimisticNewHistory = toMyBookHistoryViewModel(optimisticDTO);

      queryClient.setQueryData<MyBookHistory[]>(
        historiesQueryKey,
        (oldHistories = []) => [...oldHistories, optimisticNewHistory]
      );

      return {
        previousHistories,
        optimisticId: optimisticNewHistory.id,
      };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(historiesQueryKey, context.previousHistories);
      }
    },
    onSuccess: (realNewHistory, _vars, context) => {
      queryClient.setQueryData<MyBookHistory[]>(historiesQueryKey, (old = []) =>
        old.map(history =>
          history.id === context.optimisticId ? realNewHistory : history
        )
      );
    },
    onSettled: (_data, _error, _vars, context) => {
      if (context) {
        queryClient.invalidateQueries({ queryKey: historiesQueryKey });
      }
    },
  });
};
