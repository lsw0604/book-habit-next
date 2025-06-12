import type {
  CreateMyBookHistoryPayload,
  ResponseRegisterMyBookHistory,
} from '@/entities/my-book-history/api/types';
import type { AxiosError } from 'axios';
import type { ErrorResponseDto } from '@/shared/api/types/error';
import { useMutation } from '@tanstack/react-query';
import { myBookHistoryService } from '@/entities/my-book-history/api';

export const useAddMyBookHistory = () => {
  const { addMyBookHistory } = myBookHistoryService;
  return useMutation<
    ResponseRegisterMyBookHistory,
    AxiosError<ErrorResponseDto>,
    CreateMyBookHistoryPayload
  >({
    mutationFn: (payload: CreateMyBookHistoryPayload) =>
      addMyBookHistory(payload),
  });
};
