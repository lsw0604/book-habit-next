import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@/hooks/useToastHook';
import { queriesKey } from 'queries';

const { useCommentsReplyListQueryKey } = queriesKey.comments;

async function fetchReplyList(
  comment_id: number
): Promise<CommentsReplyListQueryResponseType> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/comments/reply/list/${comment_id}`,
    {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    }
  );

  const data: CommentsReplyListQueryResponseType = await response.json();

  return data;
}

export default function useCommentsReplyListQuery(
  comment_id: CommentsReplyListQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isError, isLoading, error, refetch, isFetching } = useQuery<
    CommentsReplyListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >(
    [useCommentsReplyListQueryKey, comment_id],
    () => fetchReplyList(comment_id),
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
    refetch,
    isLoading,
    isFetching,
  };
}
