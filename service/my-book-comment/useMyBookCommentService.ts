import { queryKeys } from '@/queries/query-key';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import MyBookCommentService from './MyBookCommentService';

export function useMyBookComment(myBookId: RequestGetMyBookCommentList) {
  return useQuery<
    ResponseGetMyBookCommentList,
    AxiosError<NestServerErrorType>
  >({
    queryKey: [queryKeys.myBookComment.all(myBookId)],
    queryFn: () => MyBookCommentService.all(myBookId),
    gcTime: 30 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
  });
}

export function useMyBookCommentMutation() {
  const addMyBookComment = () => {};

  const updateMyBookComment = () => {};

  const removeMyBookComment = () => {};

  return {
    addMyBookComment,
    updateMyBookComment,
    removeMyBookComment,
  };
}
