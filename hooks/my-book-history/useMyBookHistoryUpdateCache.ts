import { queryKeys } from '@/queries/query-key';
import { useQueryClient } from '@tanstack/react-query';
import useMyBookHistoryInvalidateCache from './useMyBookHistoryInvalidateCache';

export default function useMyBookHistoryUpdateCache() {
  const queryClient = useQueryClient();

  const updateMyBookHistoryQueryData = (response: MyBookHistoryItemType) => {
    const previousMyBookHistoryData =
      queryClient.getQueryData<ResponseGetMyBookHistory>(
        queryKeys.myBookHistory.list(response.myBookId).queryKey
      );

    if (previousMyBookHistoryData) {
      const updatedHistories: MyBookHistoryItemType[] =
        previousMyBookHistoryData.myBookHistory.map((history) =>
          history.id === response.id ? { ...response } : history
        );

      queryClient.setQueryData<ResponseGetMyBookHistory>(
        queryKeys.myBookHistory.list(response.myBookId).queryKey,
        { myBookHistory: updatedHistories }
      );
    } else {
      useMyBookHistoryInvalidateCache(response.myBookId);
    }
  };

  const addMyBookHistoryQueryData = (response: MyBookHistoryItemType) => {
    const previousMyBookHistoryData =
      queryClient.getQueryData<ResponseGetMyBookHistory>(
        queryKeys.myBookHistory.list(response.myBookId).queryKey
      );

    if (previousMyBookHistoryData) {
      const updatedHistories: MyBookHistoryItemType[] = [
        ...previousMyBookHistoryData.myBookHistory,
        response,
      ];

      queryClient.setQueryData<ResponseGetMyBookHistory>(
        queryKeys.myBookHistory.list(response.myBookId).queryKey,
        { myBookHistory: updatedHistories }
      );
    } else {
      useMyBookHistoryInvalidateCache(response.myBookId);
    }
  };

  const removeMyBookHistoryQueryData = (response: MyBookHistoryItemType) => {
    const previousMyBookHistoryData =
      queryClient.getQueryData<ResponseGetMyBookHistory>(
        queryKeys.myBookHistory.list(response.myBookId).queryKey
      );

    if (previousMyBookHistoryData) {
      const updatedHistories: MyBookHistoryItemType[] =
        previousMyBookHistoryData.myBookHistory.filter(
          (history: MyBookHistoryItemType) => history.id !== response.id
        );

      queryClient.setQueryData<ResponseGetMyBookHistory>(
        queryKeys.myBookHistory.list(response.myBookId).queryKey,
        { myBookHistory: updatedHistories }
      );
    } else {
      useMyBookHistoryInvalidateCache(response.myBookId);
    }
  };

  return {
    updateMyBookHistoryQueryData,
    addMyBookHistoryQueryData,
    removeMyBookHistoryQueryData,
  };
}
