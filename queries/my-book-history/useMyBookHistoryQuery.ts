import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getMyBookHistoryAPI } from '@/service/my-book-history';
import { queryKeys } from '../query-key';

export default function useMyBookHistoryQuery(
  payload: RequestGetMyBookHistory
) {
  return useQuery<ResponseGetMyBookHistory, AxiosError<NestServerErrorType>>({
    queryKey: [queryKeys.myBook.detail(payload)],
    queryFn: () => getMyBookHistoryAPI(payload),
    gcTime: 30 * 60 * 1000, // 30분
    staleTime: 10 * 60 * 1000, // 10분
  });
}
