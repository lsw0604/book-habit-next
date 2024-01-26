import { dehydrate } from '@tanstack/react-query';

import CommentDetailReplyList from './_components/comment-detail-reply-list';

import ReactQueryHydrate from '@/lib/ReactQueryHydrate';
import { commentsReplyListAPI } from '@/lib/api/comments';
import getQueryClient from '@/lib/getQueryClient';
import { queriesKey } from 'queries';

const { useCommentsReplyListQueryKey } = queriesKey.comments;

export default async function CommentDetailReplyListPage({
  params,
}: {
  params: { comment_id: number };
}) {
  const { comment_id } = params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [useCommentsReplyListQueryKey, comment_id.toString()],
    () => commentsReplyListAPI(comment_id)
  );

  return (
    <ReactQueryHydrate state={dehydrate(queryClient)}>
      <CommentDetailReplyList comment_id={comment_id} />
    </ReactQueryHydrate>
  );
}
