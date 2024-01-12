import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';

import useToastHook from '@/hooks/useToastHook';
import { queriesKey } from 'queries';
import { commentsReplyListAPI } from '@/lib/api/comments';

const { useCommentsReplyListQueryKey } = queriesKey.comments;

// async function fetchReplyList(comment_id: number) {
//   const { data } = await axios.get<CommentsReplyListQueryResponseType>(
//     `${process.env.NEXT_PUBLIC_SERVER}/api/comments/reply/list/${comment_id}`,
//     {
//       method: 'GET',
//       headers: {
//         Accepts: 'application/json',
//         'Content-Type': 'application/json; charset=UTF-8',
//       },
//       withCredentials: true,
//     }
//   );

//   return data;
// }

export default function useCommentsReplyListQuery(
  comment_id: CommentsReplyListQueryRequestType
) {
  const { addToast } = useToastHook();

  const { data, isError, isLoading, error, refetch, isFetching } = useQuery<
    CommentsReplyListQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    CommentsReplyListQueryListType
  >(
    [useCommentsReplyListQueryKey, comment_id],
    // () => fetchReplyList(comment_id),
    () => commentsReplyListAPI(comment_id),
    // {
    //   suspense: true,
    // },
    {
      select: (response) => {
        const { reply_list } = response;
        return reply_list;
      },
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
