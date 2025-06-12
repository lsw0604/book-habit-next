import type { AxiosError } from 'axios';
import type { ResponseGetMyBookHistory } from '../../api/types';
import type { ErrorResponseDto } from '@/shared/api/types/error';
import { useQuery } from '@tanstack/react-query';
import { myBookHistoryService } from '../../api';
import { queryKeys } from '@/shared/query/keys';

export const useMyBookHistories = (myBookId: number) => {
  const { getMyBookHistories } = myBookHistoryService;

  return useQuery<ResponseGetMyBookHistory[], AxiosError<ErrorResponseDto>>({
    queryKey: queryKeys.myBookHistory.list(myBookId).queryKey,
    queryFn: () => getMyBookHistories(myBookId),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};
