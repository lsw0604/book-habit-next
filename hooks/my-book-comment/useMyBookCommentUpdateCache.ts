import { queryKeys } from '@/constant/queries-key';
import { useQueryClient } from '@tanstack/react-query';

export const useMyBookCommentUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData =
      queryClient.getQueryData<ResponseGetMyBookCommentList>([
        queryKeys.myBookComment.getList({ myBookId: response.myBookId }),
      ]);

    if (previousMyBookCommentData) {
      const updatedComments = previousMyBookCommentData.myBookCommentList.map(
        (comment) => (comment.id === response.id ? { ...response } : comment)
      );

      const updatedMyBookCommentData = {
        ...previousMyBookCommentData,
        myBookCommentList: updatedComments,
      };

      queryClient.setQueryData<ResponseGetMyBookCommentList>(
        [queryKeys.myBookComment.getList({ myBookId: response.myBookId })],
        updatedMyBookCommentData
      );
    }
  };

  const addMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData =
      queryClient.getQueryData<ResponseGetMyBookCommentList>([
        queryKeys.myBookComment.getList({ myBookId: response.myBookId }),
      ]);

    if (previousMyBookCommentData) {
      const updatedComments = [
        ...previousMyBookCommentData.myBookCommentList,
        response,
      ];

      const updatedMyBookCommentData = {
        ...previousMyBookCommentData,
        myBookCommentList: updatedComments,
      };

      queryClient.setQueryData<ResponseGetMyBookCommentList>(
        [queryKeys.myBookComment.getList({ myBookId: response.myBookId })],
        updatedMyBookCommentData
      );
    }
  };

  const removeMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData =
      queryClient.getQueryData<ResponseGetMyBookCommentList>([
        queryKeys.myBookComment.getList({ myBookId: response.myBookId }),
      ]);

    if (previousMyBookCommentData) {
      const updatedComments = [
        ...previousMyBookCommentData.myBookCommentList.filter(
          (comment) => comment.id !== response.id
        ),
      ];

      const updatedMyBookCommentData = {
        ...previousMyBookCommentData,
        myBookCommentList: updatedComments,
      };

      return queryClient.setQueryData<ResponseGetMyBookCommentList>(
        [queryKeys.myBookComment.getList({ myBookId: response.myBookId })],
        updatedMyBookCommentData
      );
    }
  };

  return {
    updateMyBookCommentQueryData,
    addMyBookCommentQueryData,
    removeMyBookCommentQueryData,
  };
};
