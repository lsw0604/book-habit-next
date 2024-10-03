import { queryKeys } from '@/constant/queries-key';
import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateMyBookCache = () => {
  const queryClient = useQueryClient();

  const invalidateList = () => {
    return queryClient.invalidateQueries({
      queryKey: [queryKeys.myBook.getList],
      exact: false,
    });
  };

  const invalidateListSpecific = (
    params: Pick<RequestGetMyBookList, 'status' | 'order'>
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
