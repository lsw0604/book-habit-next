import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorResponseDTO } from '@/shared/api/types/error';

import { type UpdateMyBookHistoryPayload, myBookHistoryService } from '../api';
import { type MyBookHistory, toMyBookHistoryViewModel } from '../model';

export const useUpdateMyBookHistory = () => {
  const { updateMyBookHistory } = myBookHistoryService;

  return useMutation<
    MyBookHistory,
    AxiosError<ErrorResponseDTO>,
    UpdateMyBookHistoryPayload
  >({
    mutationFn: async (payload: UpdateMyBookHistoryPayload) => {
      const response = await updateMyBookHistory(payload);
      return toMyBookHistoryViewModel(response);
    },
  });
};
