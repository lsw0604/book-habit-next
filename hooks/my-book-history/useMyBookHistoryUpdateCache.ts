import { queryKeys } from '@/queries/query-key';
import { useQueryClient } from '@tanstack/react-query';

export default function useMyBookHistoryUpdateCache() {
  const queryClient = useQueryClient();

  const updateMyBookHistoryQueryData = () => {};

  const addMyBookHistoryQueryData = (response: MyBookHistoryItemType) => {
    const previousMyBookHistoryData = queryClient.getQueryData<
      MyBookHistoryItemType[]
    >([queryKeys..getList(response.myBookId)]);

    if (previousMyBookHistoryData) {
      const updatedHistories: MyBookHistoryItemType[] = [
        ...previousMyBookHistoryData,
        response,
      ];

      queryClient.setQueryData<MyBookHistoryItemType[]>(
        [queryKeys.myBookHistory.getList(response.myBookId)],
        updatedHistories
      );
    }
  };

  const removeMyBookHistoryQueryData = () => {};

  return {
    updateMyBookHistoryQueryData,
    addMyBookHistoryQueryData,
    removeMyBookHistoryQueryData,
  };
}
