import { dehydrate } from '@tanstack/react-query';

import CommentTimer from './_components/comment-timer';
import CommentsList from './_components/comment-list';

import { commentsListAPI } from '@/lib/api/comments';
import getQueryClient from '@/lib/getQueryClient';
import ReactQueryHydrate from '@/lib/ReactQueryHydrate';

import { queriesKey } from '@/queries';

const { useCommentsListQueryKey } = queriesKey.comments;

export default async function CommentsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([useCommentsListQueryKey], commentsListAPI);

  return (
    <ReactQueryHydrate state={dehydrate(queryClient)}>
      <div className="w-full h-full relative flex flex-col">
        <div className="px-4 py-0 flex flex-col relative my-4">
          <CommentTimer />
        </div>
        <CommentsList />
      </div>
    </ReactQueryHydrate>
  );
}
