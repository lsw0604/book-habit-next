import { queryKeys } from '@/queries/query-key';
import { useQueryClient } from '@tanstack/react-query';

export default function useMyBookCommentInvalidateCache(myBookId: number) {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({
    queryKey: queryKeys.myBookComment.all(myBookId).queryKey,
  });
}
