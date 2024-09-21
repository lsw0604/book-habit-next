import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import { commentsReplyDeleteAPI } from 'lib/api/comments';
import useToastHook from '@/hooks/toast/useToastHook';
import { queriesKey, queryClient } from 'queries';

const {
  useCommentsReplyDeleteMutationKey,
  useCommentsReplyListQueryKey,
  useCommentsListQueryKey,
  useCommentsDetailQueryKey,
} = queriesKey.comments;

export default function useCommentsReplyDeleteMutation(
  reply_id: CommentsReplyDeleteMutationRequestType,
  comment_id: CommentsReplyDeleteMutationRequestType
) {
  const { addToast } = useToastHook();

  const { data, mutate, isSuccess, isError, error, isLoading } = useMutation<
    CommentsReplyDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyDeleteMutationRequestType
  >(
    [
      useCommentsReplyDeleteMutationKey,
      comment_id.toString(),
      reply_id.toString(),
    ],
    commentsReplyDeleteAPI,
    {
      onSuccess: (response) => {
        const commentsListData =
          queryClient.getQueryData<CommentsListQueryResponseType>([
            useCommentsListQueryKey,
          ]);
        const commentDetailData =
          queryClient.getQueryData<CommentsDetailQueryResponseType>([
            useCommentsDetailQueryKey,
            comment_id.toString(),
          ]);

        if (commentsListData) {
          const synthesizedCommentsListData = commentsListData?.comments.map(
            (comment) => {
              if (comment.comment_id.toString() === comment_id.toString()) {
                const newComment: CommentsItemType = {
                  ...comment,
                  reply_ids: comment.reply_ids.filter(
                    (reply) => reply.reply_id !== response.reply_id
                  ),
                };

                return newComment;
              }
              return comment;
            }
          );
          queryClient.setQueryData([useCommentsListQueryKey], {
            comments: synthesizedCommentsListData,
          });
        } else {
          queryClient.invalidateQueries({
            queryKey: [useCommentsListQueryKey],
          });
        }

        if (commentDetailData) {
          const synthesizedCommentDetailData: CommentsItemType = {
            ...commentDetailData,
            reply_ids: commentDetailData.reply_ids.filter(
              (reply) =>
                reply.reply_id.toString() !== response.reply_id.toString()
            ),
          };
          queryClient.setQueryData(
            [useCommentsDetailQueryKey, comment_id.toString()],
            {
              ...synthesizedCommentDetailData,
            }
          );
        } else {
          queryClient.invalidateQueries({
            queryKey: [useCommentsDetailQueryKey, comment_id.toString()],
          });
        }
        queryClient.invalidateQueries({
          queryKey: [useCommentsReplyListQueryKey, comment_id.toString()],
        });
      },
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      const { message, status } = data;
      addToast({ message, status });
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    mutate,
    isLoading,
    isSuccess,
  };
}
