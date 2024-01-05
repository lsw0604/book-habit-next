import { dehydrate } from '@tanstack/react-query';

import getQueryClient from 'lib/getQueryClient';
import ReactQueryHydrate from 'lib/ReactQueryHydrate';
import CommentsFilterProvider from 'components/comments/CommentsFilterProvider';
import CommentsTimer from 'components/comments/CommentsTimer';
import { queriesKey } from 'queries';

async function fetchCommentList(): Promise<
  CommentsListQueryResponseType | undefined
> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/comments/list`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accepts: 'application/json',
      },
      credentials: 'include',
    }
  );

  return await response.json();
}

const { useCommentsListQueryKey } = queriesKey.comments;

export default async function CommentsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([useCommentsListQueryKey], fetchCommentList);
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <CommentsFilterProvider>
        <CommentsTimer />
      </CommentsFilterProvider>
    </ReactQueryHydrate>
  );
}
