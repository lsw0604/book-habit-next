import type { RequestGetMyBooks } from '@/service/api/my-book/types';

import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/queries';

export const useMyBookInvalidateCache = () => {
  const queryClient = useQueryClient();

  const invalidateList = (
    params?: Pick<RequestGetMyBooks, 'order' | 'status'>
  ) => {
    if (params) {
      return queryClient.invalidateQueries({
        queryKey: queryKeys.myBook.list(params).queryKey,
      });
    } else {
      return queryClient.invalidateQueries({
        queryKey: ['myBook', 'list'],
        refetchType: 'inactive',
      });
    }
  };

  const invalidateDetail = (myBookId: number) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.myBook.detail({ myBookId }).queryKey,
      exact: true,
    });
  };

  const invalidateAll = () =>
    queryClient.invalidateQueries({
      queryKey: ['myBook'],
      refetchType: 'inactive',
    });

  return {
    invalidateList,
    invalidateDetail,
    invalidateAll,
  };
};
