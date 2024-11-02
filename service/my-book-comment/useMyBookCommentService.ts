import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/queries/query-key';
import MyBookCommentService from './MyBookCommentService';
import { useMyBookCommentUpdateCache } from '@/hooks/my-book-comment/useMyBookCommentUpdateCache';

export function useMyBookComment(myBookId: RequestGetMyBookCommentList) {
  return useQuery<
    ResponseGetMyBookCommentList,
    AxiosError<NestServerErrorType>
  >({
    queryKey: queryKeys.myBookComment.all(myBookId).queryKey,
    queryFn: () => MyBookCommentService.all(myBookId),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
}

export function useMyBookCommentMutation() {
  const {
    addMyBookCommentQueryData,
    updateMyBookCommentQueryData,
    removeMyBookCommentQueryData,
  } = useMyBookCommentUpdateCache();

  const addMyBookComment = useMutation<
    ResponsePostMyBookComment,
    AxiosError<NestServerErrorType>,
    RequestPostMyBookComment
  >({
    mutationFn: (payload: RequestPostMyBookComment) =>
      MyBookCommentService.create(payload),
    onSuccess: addMyBookCommentQueryData,
  });

  const updateMyBookComment = useMutation<
    ResponseUpdateMyBookComment,
    AxiosError<NestServerErrorType>,
    RequestUpdateMyBookComment
  >({
    mutationFn: (payload: RequestUpdateMyBookComment) =>
      MyBookCommentService.update(payload),
    onSuccess: updateMyBookCommentQueryData,
  });

  const removeMyBookComment = useMutation<
    ResponseDeleteMyBookComment,
    AxiosError<NestServerErrorType>,
    RequestDeleteMyBookComment
  >({
    mutationFn: (payload: RequestDeleteMyBookComment) =>
      MyBookCommentService.remove(payload),
    onSuccess: removeMyBookCommentQueryData,
  });

  return {
    addMyBookComment,
    updateMyBookComment,
    removeMyBookComment,
  };
}
