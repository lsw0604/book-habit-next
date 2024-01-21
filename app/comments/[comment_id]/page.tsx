import { dehydrate } from '@tanstack/react-query';

import CommentDetail from './_components/comment-detail';

import { queriesKey } from '@/queries';
import getQueryClient from '@/lib/getQueryClient';
import ReactQueryHydrate from '@/lib/ReactQueryHydrate';
import { commentsDetailAPI } from '@/lib/api/comments';
import CommentDetailReplyList from './_components/comment-detail-reply-list';

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
    <div className="w-full h-full flex flex-col p-4 overflow-auto box-border">
      <ReactQueryHydrate state={dehydrate(queryClient)}>
        <CommentDetail comment_id={comment_id} />
      </ReactQueryHydrate>
      <div className="flex h-full flex-col justify-between p-4 rounded-lg shadow-lg">
        <CommentDetailReplyList comment_id={comment_id} />
        <div>form</div>
      </div>
    </div>
  );
}
