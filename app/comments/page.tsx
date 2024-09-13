import { dehydrate, useQuery } from '@tanstack/react-query';

import CommentTimer from './_components/comment-timer';
import CommentsList from './_components/comment-list';

import { commentsListAPI } from '@/lib/api/comments';
import getQueryClient from '@/lib/getQueryClient';
import ReactQueryHydrate from '@/lib/ReactQueryHydrate';

import { queriesKey } from '@/queries';
import { getPublicCommentListAPI } from '@/src/service/public-comment';
import { useRouter } from 'next/router';

const { useCommentsListQueryKey } = queriesKey.comments;

export default async function CommentsPage() {
  // const router = useRouter();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([useCommentsListQueryKey], commentsListAPI);
  // const { page, page_size, start_date, end_date } = router.query;

  // const { data } = useQuery([useCommentsListQueryKey], () =>
  //   getPublicCommentListAPI()
  // );

  // console.log(data);

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
