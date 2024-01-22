import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';

import { commentsDetailAPI } from 'lib/api/comments';
import { queriesKey } from 'queries';

const { useCommentsDetailQueryKey } = queriesKey.comments;

export default function useCommentsDetailQuery(
  comment_id: CommentsDetailQueryRequestType
) {
  const { data, isLoading, isFetching, error, isError, refetch } = useQuery<
    CommentsDetailQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([useCommentsDetailQueryKey, comment_id.toString()], () =>
    commentsDetailAPI(comment_id)
  );

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    refetch,
  };
}
