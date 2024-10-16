import { queryKeys } from '@/constant/queries-key';
import { useQueryClient } from '@tanstack/react-query';

export const useMyBookCommentUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData = queryClient.getQueryData<
      MyBookCommentItemType[]
    >([queryKeys.myBookComment.getList({ myBookId: response.myBookId })]);

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] =
        previousMyBookCommentData.map((comment) =>
          comment.id === response.id ? { ...response } : comment
        );

      queryClient.setQueryData<MyBookCommentItemType[]>(
        [queryKeys.myBookComment.getList({ myBookId: response.myBookId })],
        updatedComments
      );
    }
  };

  const addMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData = queryClient.getQueryData<
      MyBookCommentItemType[]
    >([queryKeys.myBookComment.getList({ myBookId: response.myBookId })]);

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] = [
        ...previousMyBookCommentData,
        response,
      ];

      queryClient.setQueryData<MyBookCommentItemType[]>(
        [queryKeys.myBookComment.getList({ myBookId: response.myBookId })],
        updatedComments
      );
    }
  };

  const removeMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData = queryClient.getQueryData<
      MyBookCommentItemType[]
    >([queryKeys.myBookComment.getList({ myBookId: response.myBookId })]);

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] =
        previousMyBookCommentData.filter(
          (comment: MyBookCommentItemType) => comment.id !== response.id
        );

      queryClient.setQueryData<MyBookCommentItemType[]>(
        [queryKeys.myBookComment.getList({ myBookId: response.myBookId })],
        updatedComments
      );
    }
  };

  return {
    updateMyBookCommentQueryData,
    addMyBookCommentQueryData,
    removeMyBookCommentQueryData,
  };
};
