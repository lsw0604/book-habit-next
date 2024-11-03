import { queryKeys } from '@/queries/query-key';
import { useQueryClient } from '@tanstack/react-query';

export const useMyBookInvalidateCache = () => {
  const queryClient = useQueryClient();

  const invalidateList = () => {
    queryClient.invalidateQueries({
      queryKey: ['myBook'],
    });
  };

  const invalidateDetail = (myBookId: number) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.myBook.detail(myBookId).queryKey,
    });
  };

  return {
    invalidateList,
    invalidateDetail,
  };
};
