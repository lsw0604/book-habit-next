import type { AxiosError } from 'axios';
import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { type DeleteMyBookHistoryPayload, myBookHistoryService } from '../api';
import { type MyBookHistory, toMyBookHistoryViewModel } from '../model';
import { useMutation } from '@tanstack/react-query';

export const useDeleteMyBookHistory = () => {
  const { deleteMyBookHistory } = myBookHistoryService;

  return useMutation<
    MyBookHistory,
    AxiosError<ErrorResponseDTO>,
    DeleteMyBookHistoryPayload
  >({
    mutationFn: async (payload: DeleteMyBookHistoryPayload) => {
      const response = await deleteMyBookHistory(payload);
      return toMyBookHistoryViewModel(response);
    },
  });
};
