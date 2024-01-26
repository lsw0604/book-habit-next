import { dehydrate } from '@tanstack/react-query';

import CommentDetail from './_components/comment-detail';

import getQueryClient from '@/lib/getQueryClient';
import ReactQueryHydrate from '@/lib/ReactQueryHydrate';
import { commentsDetailAPI } from '@/lib/api/comments';
import { queriesKey } from 'queries';

const { useCommentsDetailQueryKey } = queriesKey.comments;

export default async function CommentDetailPage({
  params,
}: {
  params: { comment_id: number };
}) {
  const { comment_id } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [useCommentsDetailQueryKey, comment_id.toString()],
    () => commentsDetailAPI(comment_id)
  );

  return (
    <ReactQueryHydrate state={dehydrate(queryClient)}>
      <CommentDetail comment_id={comment_id} />
    </ReactQueryHydrate>
  );
}
