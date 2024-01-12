import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import useToastHook from '@/hooks/useToastHook';
import { commentsDetailAPI } from 'lib/api/comments';
import { queriesKey } from 'queries';

const { useCommentsDetailQueryKey } = queriesKey.comments;

async function fetchCommentDetail(comment_id: number) {
  const { data } = await axios.get<CommentsDetailQueryResponseType>(
    `${process.env.NEXT_PUBLIC_SERVER}/api/comments/detail/${comment_id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    }
  );

  return data;
}

export default function useCommentsDetailQuery(
  comment_id: CommentsDetailQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isLoading, isFetching, error, isError, refetch } = useQuery<
    CommentsDetailQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >(
    [useCommentsDetailQueryKey, comment_id],
    () => fetchCommentDetail(comment_id),
    {
      suspense: true,
    }
  );

  useEffect(() => {
    if (isError && error && error.response && error.response.data) {
      const { message, status } = error.response.data;
      addToast({ message, status });
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
}
