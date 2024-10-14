import { registerMyBookCommentAPI } from '@/service/my-book-comment';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export default function useMyBookCommentMutation() {
  const addMyBookComment = () => {
    return useMutation<
      ResponseRegisterMyBookComment,
      AxiosError<NestServerErrorType>,
      RequestRegisterMyBookComment
    >({
      mutationFn: (payload: RequestRegisterMyBookComment) =>
        registerMyBookCommentAPI(payload),
      onSuccess: () => {},
    });
  };

  const removeMyBookComment = () => {};

  const updateMyBookComment = () => {};

  return {
    addMyBookComment,
    removeMyBookComment,
    updateMyBookComment,
  };
}
