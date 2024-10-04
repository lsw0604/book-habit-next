import { queryKeys } from '@/constant/queries-key';
import { useQueryClient } from '@tanstack/react-query';
import { MY_BOOK_ORDER, MY_BOOK_STATUS } from '@/constant/my-book-field';

export const useMyBookInvalidateCache = () => {
  const queryClient = useQueryClient();

  const invalidateList = () => {
    for (const order of MY_BOOK_ORDER) {
      for (const status of MY_BOOK_STATUS) {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.myBook.getList({ order, status })],
        });
      }
    }
  };

  const invalidateListSpecific = (
    params: Pick<RequestGetMyBookList, 'order' | 'status'>
  ) => {
    return queryClient.invalidateQueries({
      queryKey: [queryKeys.myBook.getList(params)],
    });
  };

  const invalidateDetail = (myBookId: number) => {
    return queryClient.invalidateQueries({
      queryKey: [queryKeys.myBook.getDetail(myBookId)],
    });
  };

  return {
    invalidateList,
    invalidateListSpecific,
    invalidateDetail,
  };
};
