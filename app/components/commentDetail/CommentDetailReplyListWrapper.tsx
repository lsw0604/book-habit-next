import axios from 'axios';
import { dehydrate } from '@tanstack/react-query';
import getQueryClient from 'lib/getQueryClient';
import { queriesKey } from '@/queries';
import ReactQueryHydrate from 'lib/ReactQueryHydrate';
import CommentDetailReplyList from './CommentDetailReplyList';

async function fetchCommentDetailReplyList({
  comment_id,
}: {
  comment_id: number;
}) {
  const { data } = await axios.get<CommentsReplyListQueryResponseType>(
    `${process.env.NEXT_PUBLIC_SERVER}/api/comments/reply/list/${comment_id}`,
    {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    }
  );
  return data;
}

const { useCommentsReplyListQueryKey } = queriesKey.comments;

export default async function CommentDetailReplyListWrapper({
  comment_id,
}: {
  comment_id: number;
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [useCommentsReplyListQueryKey, comment_id],
    () => fetchCommentDetailReplyList({ comment_id })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <CommentDetailReplyList comment_id={comment_id} />
    </ReactQueryHydrate>
  );
}
