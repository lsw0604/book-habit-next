import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { myBookHistoryService } from '../../api';
import { ResponseDeleteMyBookHistory } from '../../api/types';
import { ErrorResponseDto } from '@/shared/api/types/error';

export const useDeleteMyBookHistory = () => {
  const { deleteMyBookHistory } = myBookHistoryService;
  return useMutation<
    ResponseDeleteMyBookHistory,
    AxiosError<ErrorResponseDto>,
    number
  >({
    mutationFn: (myBookHistoryId: number) =>
      deleteMyBookHistory(myBookHistoryId),
  });
};
