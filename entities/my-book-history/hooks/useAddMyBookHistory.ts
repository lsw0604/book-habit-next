import type { AxiosError } from 'axios';
import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { type CreateMyBookHistoryPayload, myBookHistoryService } from '../api';
import { type MyBookHistory, toMyBookHistoryViewModel } from '../model';
import { useMutation } from '@tanstack/react-query';

export const useAddMyBookHistory = () => {
  const { addMyBookHistory } = myBookHistoryService;

  return useMutation<
    MyBookHistory,
    AxiosError<ErrorResponseDTO>,
    CreateMyBookHistoryPayload
  >({
    mutationFn: async (payload: CreateMyBookHistoryPayload) => {
      const response = await addMyBookHistory(payload);
      return toMyBookHistoryViewModel(response);
    },
  });
};
