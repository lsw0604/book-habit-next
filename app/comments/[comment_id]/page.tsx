import { dehydrate } from '@tanstack/react-query';

import CommentDetail from './_components/comment-detail';
import CommentDetailReplyList from './_components/comment-detail-reply-list';
import CommentDetailReplyForm from './_components/comment-detail-reply-form';

import { queriesKey } from '@/queries';
import getQueryClient from '@/lib/getQueryClient';
import ReactQueryHydrate from '@/lib/ReactQueryHydrate';
import { commentsDetailAPI, commentsReplyListAPI } from '@/lib/api/comments';

const { useCommentsDetailQueryKey, useCommentsReplyListQueryKey } =
  queriesKey.comments;

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
  await queryClient.prefetchQuery(
    [useCommentsReplyListQueryKey, comment_id.toString()],
    () => commentsReplyListAPI(comment_id)
  );

  return (
    <div className="w-full h-full flex flex-col p-4 overflow-auto box-border">
      <ReactQueryHydrate state={dehydrate(queryClient)}>
        <CommentDetail comment_id={comment_id} />
        <div className="flex h-full flex-col justify-between p-4 rounded-lg shadow-lg">
          <CommentDetailReplyList comment_id={comment_id} />
          <CommentDetailReplyForm />
        </div>
      </ReactQueryHydrate>
    </div>
  );
}
