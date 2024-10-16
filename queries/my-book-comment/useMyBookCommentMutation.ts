import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  deleteMyBookCommentAPI,
  registerMyBookCommentAPI,
  updateMyBookCommentAPI,
} from '@/service/my-book-comment';
import { useMyBookCommentUpdateCache } from '@/hooks/my-book-comment/useMyBookCommentUpdateCache';

export default function useMyBookCommentMutation() {
  const {
    addMyBookCommentQueryData,
    removeMyBookCommentQueryData,
    updateMyBookCommentQueryData,
  } = useMyBookCommentUpdateCache();

  const addMyBookComment = () => {
    return useMutation<
      ResponseRegisterMyBookComment,
      AxiosError<NestServerErrorType>,
      RequestRegisterMyBookComment
    >({
      mutationFn: (payload: RequestRegisterMyBookComment) =>
        registerMyBookCommentAPI(payload),
      onSuccess: addMyBookCommentQueryData,
    });
  };

  const removeMyBookComment = () => {
    return useMutation<
      ResponseDeleteMyBookComment,
      AxiosError<NestServerErrorType>,
      RequestDeleteMyBookComment
    >({
      mutationFn: (payload: RequestDeleteMyBookComment) =>
        deleteMyBookCommentAPI(payload),
      onSuccess: removeMyBookCommentQueryData,
    });
  };

  const updateMyBookComment = () => {
    return useMutation<
      ResponseUpdateMyBookComment,
      AxiosError<NestServerErrorType>,
      RequestUpdateMyBookComment
    >({
      mutationFn: (payload: RequestUpdateMyBookComment) =>
        updateMyBookCommentAPI(payload),
      onSuccess: updateMyBookCommentQueryData,
    });
  };

  return {
    addMyBookComment,
    removeMyBookComment,
    updateMyBookComment,
  };
}
