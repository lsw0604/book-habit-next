import { useMutation } from '@tanstack/react-query';
import { myBookHistoryService } from '../../api';
import { MyBookHistory, UpdateMyBookHistoryPayload } from '../../api/types';
import { AxiosError } from 'axios';
import { ErrorResponseDto } from '@/shared/api/types/error';

export const useUpdateMyBookHistory = () => {
  const { updateMyBookHistory } = myBookHistoryService;
  return useMutation<
    MyBookHistory,
    AxiosError<ErrorResponseDto>,
    UpdateMyBookHistoryPayload
  >({
    mutationFn: (payload: UpdateMyBookHistoryPayload) =>
      updateMyBookHistory(payload),
  });
};
