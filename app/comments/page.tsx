import { dehydrate } from '@tanstack/react-query';

import getQueryClient from 'lib/getQueryClient';
import ReactQueryHydrate from 'lib/ReactQueryHydrate';
import CommentsFilterProvider from 'components/comments/CommentsFilterProvider';
import CommentsTimer from 'components/comments/CommentsTimer';
import { queriesKey } from 'queries';

import axios from 'axios';

export async function fetchCommentList() {
  const { data } = await axios.get<CommentsListQueryResponseType>(
    `${process.env.NEXT_PUBLIC_SERVER}/api/comments/list`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      withCredentials: true,
    }
  );

  return data;
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
