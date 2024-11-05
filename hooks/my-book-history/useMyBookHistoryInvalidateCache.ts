import { queryKeys } from '@/queries/query-key';
import { useQueryClient } from '@tanstack/react-query';

export default function useMyBookHistoryInvalidateCache(myBookId: number) {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: queryKeys.myBookHistory.list(myBookId).queryKey,
  });
}
