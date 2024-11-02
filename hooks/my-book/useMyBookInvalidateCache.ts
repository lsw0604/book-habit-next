import { queryKeys } from '@/queries/query-key';
import { useQueryClient } from '@tanstack/react-query';
import { MY_BOOK_ORDER, MY_BOOK_STATUS } from '@/constant/my-book-field';

export const useMyBookInvalidateCache = () => {
  const queryClient = useQueryClient();

  const invalidateList = () => {
    for (const order of MY_BOOK_ORDER) {
      for (const status of MY_BOOK_STATUS) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.myBook.all({ order, status }).queryKey,
        });
      }
    }
  };

  const invalidateListSpecific = (
    params: Pick<RequestGetMyBookList, 'order' | 'status'>
  ) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.myBook.all(params).queryKey,
    });
  };

  const invalidateDetail = (myBookId: number) => {
    return queryClient.invalidateQueries({
      queryKey: queryKeys.myBook.detail(myBookId).queryKey,
    });
  };

  return {
    invalidateList,
    invalidateListSpecific,
    invalidateDetail,
  };
};
