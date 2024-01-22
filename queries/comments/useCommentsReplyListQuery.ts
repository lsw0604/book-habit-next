import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queriesKey } from 'queries';
import { commentsReplyListAPI } from '@/lib/api/comments';

const { useCommentsReplyListQueryKey } = queriesKey.comments;

export default function useCommentsReplyListQuery(
  comment_id: CommentsReplyListQueryRequestType
) {
  const { data, isError, isLoading, error, refetch, isFetching } = useQuery<
    CommentsReplyListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyListQueryListType
  >(
    [useCommentsReplyListQueryKey, comment_id.toString()],
    () => commentsReplyListAPI(comment_id),
    {
      select: (response) => {
        const { reply_list } = response;
        return reply_list;
      },
    }
  );

  return {
    error,
    isError,
    data,
    refetch,
    isLoading,
    isFetching,
  };
}
