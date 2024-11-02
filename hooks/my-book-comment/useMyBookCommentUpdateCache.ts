import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/queries/query-key';
import useMyBookCommentInvalidateCache from './useMyBookCommentInvalidateCache';

export const useMyBookCommentUpdateCache = () => {
  const queryClient = useQueryClient();

  const updateMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData = queryClient.getQueryData<
      MyBookCommentItemType[]
    >(queryKeys.myBookComment.all(response.myBookId).queryKey);

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] =
        previousMyBookCommentData.map((comment) =>
          comment.id === response.id ? { ...response } : comment
        );

      queryClient.setQueryData<MyBookCommentItemType[]>(
        queryKeys.myBookComment.all(response.myBookId).queryKey,
        updatedComments
      );
    } else {
      useMyBookCommentInvalidateCache(response.myBookId);
    }
  };

  const addMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData = queryClient.getQueryData<
      MyBookCommentItemType[]
    >(queryKeys.myBookComment.all(response.myBookId).queryKey);

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] = [
        ...previousMyBookCommentData,
        response,
      ];

      queryClient.setQueryData<MyBookCommentItemType[]>(
        queryKeys.myBookComment.all(response.myBookId).queryKey,
        updatedComments
      );
    } else {
      useMyBookCommentInvalidateCache(response.myBookId);
    }
  };

  const removeMyBookCommentQueryData = (response: MyBookCommentItemType) => {
    const previousMyBookCommentData = queryClient.getQueryData<
      MyBookCommentItemType[]
    >(queryKeys.myBookComment.all(response.myBookId).queryKey);

    if (previousMyBookCommentData) {
      const updatedComments: MyBookCommentItemType[] =
        previousMyBookCommentData.filter(
          (comment: MyBookCommentItemType) => comment.id !== response.id
        );

      queryClient.setQueryData<MyBookCommentItemType[]>(
        queryKeys.myBookComment.all(response.myBookId).queryKey,
        updatedComments
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
