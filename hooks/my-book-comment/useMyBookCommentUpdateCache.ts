import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/queries/query-key';
import useMyBookCommentInvalidateCache from './useMyBookCommentInvalidateCache';

export const useMyBookCommentUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData =
      queryClient.getQueryData<ResponseGetMyBookCommentList>(
        queryKeys.myBookComment.all(response.myBookId).queryKey
      );

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] =
        previousMyBookCommentData.myBookComment.map((comment) =>
          comment.id === response.id ? { ...response } : comment
        );

      queryClient.setQueryData<ResponseGetMyBookCommentList>(
        queryKeys.myBookComment.all(response.myBookId).queryKey,
        { myBookComment: updatedComments }
      );
    } else {
      useMyBookCommentInvalidateCache(response.myBookId);
    }
  };

  const addMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData =
      queryClient.getQueryData<ResponseGetMyBookCommentList>(
        queryKeys.myBookComment.all(response.myBookId).queryKey
      );

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] = [
        ...previousMyBookCommentData.myBookComment,
        response,
      ];

      queryClient.setQueryData<ResponseGetMyBookCommentList>(
        queryKeys.myBookComment.all(response.myBookId).queryKey,
        { myBookComment: updatedComments }
      );
    } else {
      useMyBookCommentInvalidateCache(response.myBookId);
    }
  };

  const removeMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData =
      queryClient.getQueryData<ResponseGetMyBookCommentList>(
        queryKeys.myBookComment.all(response.myBookId).queryKey
      );

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] =
        previousMyBookCommentData.myBookComment.filter(
          (comment: MyBookCommentItemType) => comment.id !== response.id
        );

      queryClient.setQueryData<ResponseGetMyBookCommentList>(
        queryKeys.myBookComment.all(response.myBookId).queryKey,
        { myBookComment: updatedComments }
      );
    } else {
      useMyBookCommentInvalidateCache(response.myBookId);
    }
  };

  return {
    updateMyBookCommentQueryData,
    addMyBookCommentQueryData,
    removeMyBookCommentQueryData,
  };
};
