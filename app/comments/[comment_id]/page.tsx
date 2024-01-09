import { dehydrate } from '@tanstack/react-query';

import CommentDetail from 'components/commentDetail';
import ReactQueryHydrate from 'lib/ReactQueryHydrate';
import getQueryClient from 'lib/getQueryClient';
import { queriesKey } from 'queries';

async function fetchCommentDetail({
  comment_id,
}: {
  comment_id: number;
}): Promise<CommentsDetailQueryResponseType | undefined> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/comments/detail/${comment_id}`,
    {
      method: 'GET',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    }
  );

  const data = await response.json();

  return data;
}

const { useCommentsDetailQueryKey } = queriesKey.comments;

export default async function CommentDetailPage({
  params,
}: {
  params: { comment_id: number };
}) {
  const { comment_id } = params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([useCommentsDetailQueryKey, comment_id], () =>
    fetchCommentDetail({ comment_id })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <CommentDetail comment_id={comment_id} />
    </ReactQueryHydrate>
  );
}
