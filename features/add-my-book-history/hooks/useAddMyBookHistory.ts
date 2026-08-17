import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  myBookHistoryQueryKeys,
  type MyBookHistoryDTO,
} from '@/entities/my-book-history';
import type { APIError } from '@/shared/api';

import { addMyBookHistoryService } from '../api';
import type { AddMyBookHistoryType } from '../schema';

interface UseAddMyBookHistoryParams {
  myBookId: number;
}

export const useAddMyBookHistory = ({
  myBookId,
}: UseAddMyBookHistoryParams) => {
  const { addMyBookHistory } = addMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = myBookHistoryQueryKeys.list(myBookId).queryKey;

  /**
   * 캐시는 DTO를 담는다. mutationFn도, 낙관적 값도 DTO 형태를 유지해야 한다.
   * ViewModel을 넣으면 읽을 때 select(toMyBookHistoryViewModel)가 한 번 더 적용되어
   * parseISO(Date)가 Invalid Date를 만든다 — 예외 없이 조용히 깨진다.
   */
  return useMutation<
    MyBookHistoryDTO,
    APIError,
    AddMyBookHistoryType,
    {
      previousHistories: MyBookHistoryDTO[];
      optimisticId: number;
    }
  >({
    mutationFn: (payload: AddMyBookHistoryType) => addMyBookHistory(payload),
    onMutate: async (payload: AddMyBookHistoryType) => {
      await queryClient.cancelQueries({ queryKey: historiesQueryKey });

      const previousHistories =
        queryClient.getQueryData<MyBookHistoryDTO[]>(historiesQueryKey) ?? [];

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

      queryClient.setQueryData<MyBookHistoryDTO[]>(
        historiesQueryKey,
        (oldHistories = []) => [...oldHistories, optimisticDTO]
      );

      return {
        previousHistories,
        optimisticId: optimisticDTO.id,
      };
    },
    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData(historiesQueryKey, context.previousHistories);
      }
    },
    onSuccess: (realNewHistory, _vars, context) => {
      queryClient.setQueryData<MyBookHistoryDTO[]>(
        historiesQueryKey,
        (old = []) =>
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
