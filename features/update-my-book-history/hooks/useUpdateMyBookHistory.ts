import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  type MyBookHistoryDTO,
  myBookHistoryQueryKeys,
} from '@/entities/my-book-history';
import type { APIError } from '@/shared/api';

import { updateMyBookHistoryService } from '../api';
import type { UpdateMyBookHistoryPayload } from '../schema';

/**
 * 폼 payload를 DTO 조각으로 바꾼다.
 * 스키마가 startTime/endTime을 z.date()로 받기 때문에 값이 Date 객체인데,
 * 캐시가 담는 DTO에서는 ISO 문자열이다. 변환 없이 스프레드하면 날짜 필드가 Date가 되고,
 * 읽을 때 select의 parseISO(Date)가 Invalid Date를 만든다.
 */
const toOptimisticPatch = ({
  startPage,
  endPage,
  startTime,
  endTime,
  readingMinutes,
  readingMood,
  memo,
}: UpdateMyBookHistoryPayload): Partial<MyBookHistoryDTO> => ({
  ...(startPage !== undefined && { startPage }),
  ...(endPage !== undefined && { endPage }),
  ...(readingMinutes !== undefined && { readingMinutes }),
  ...(readingMood !== undefined && { readingMood }),
  ...(startTime && { startTime: startTime.toISOString() }),
  ...(endTime && { endTime: endTime.toISOString() }),
  ...(memo !== undefined && { memo: memo || null }),
});

export const useUpdateMyBookHistory = (myBookId: number) => {
  const { updateMyBookHistory } = updateMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = myBookHistoryQueryKeys.list(myBookId).queryKey;

  return useMutation<
    MyBookHistoryDTO,
    APIError,
    UpdateMyBookHistoryPayload,
    {
      previousHistories: MyBookHistoryDTO[];
    }
  >({
    mutationFn: (payload: UpdateMyBookHistoryPayload) =>
      updateMyBookHistory(payload),
    onMutate: async (payload: UpdateMyBookHistoryPayload) => {
      await queryClient.cancelQueries({ queryKey: historiesQueryKey });

      const previousHistories =
        queryClient.getQueryData<MyBookHistoryDTO[]>(historiesQueryKey) ?? [];

      const patch = toOptimisticPatch(payload);
      const newHistories = previousHistories.map(history =>
        history.id === payload.id ? { ...history, ...patch } : history
      );

      queryClient.setQueryData<MyBookHistoryDTO[]>(
        historiesQueryKey,
        newHistories
      );

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
