import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getMyBookHistoryAPI } from '@/service/my-book-history';
import { queryKeys } from '@/constant/queries-key';

export default function useMyBookHistoryQuery(
  payload: RequestGetMyBookHistory
) {
  return useQuery<ResponseGetMyBookHistory, AxiosError<NestServerErrorType>>({
    queryKey: [queryKeys.myBookHistory.getList(payload)],
    queryFn: () => getMyBookHistoryAPI(payload),
    gcTime: 30 * 60 * 1000, // 30분
    staleTime: 10 * 60 * 1000, // 10분
  });
}
