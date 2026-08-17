import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  myBookHistoryQueryKeys,
  type MyBookHistoryDTO,
} from '@/entities/my-book-history';
import type { APIError } from '@/shared/api';

import { deleteMyBookHistoryService } from '../api';

export const useDeleteMyBookHistory = (myBookId: number) => {
  const { deleteMyBookHistory } = deleteMyBookHistoryService;
  const queryClient = useQueryClient();
  const historiesQueryKey = myBookHistoryQueryKeys.list(myBookId).queryKey;

  return useMutation<
    void,
    APIError,
    number,
    { previousHistories: MyBookHistoryDTO[] }
  >({
    mutationFn: async (myBookHistoryId: number) => {
      await deleteMyBookHistory(myBookHistoryId);
    },
    onMutate: async (myBookHistoryId: number) => {
      await queryClient.cancelQueries({ queryKey: historiesQueryKey });

      // 캐시는 DTO를 담는다 (읽을 때 select가 ViewModel로 바꾼다)
      const previousHistories =
        queryClient.getQueryData<MyBookHistoryDTO[]>(historiesQueryKey) ?? [];

      queryClient.setQueryData<MyBookHistoryDTO[]>(
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
