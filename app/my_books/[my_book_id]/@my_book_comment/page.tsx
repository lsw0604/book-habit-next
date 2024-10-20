import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constant/queries-key';
import { getQueryClient } from '@/providers/get-query';
import { getMyBookCommentListAPI } from '@/service/my-book-comment';
import MyBookCommentList from './_components/my_book_comment_list';

export default async function MyBookCommentPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      queryKeys.myBookComment.getList({ myBookId: params.my_book_id }),
    ],
    queryFn: () => getMyBookCommentListAPI({ myBookId: params.my_book_id }),
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <div className="h-full overflow-auto scrollbar-none">
      <HydrationBoundary state={dehydrateState}>
        <MyBookCommentList my_book_id={params.my_book_id} />
      </HydrationBoundary>
    </div>
  );
}
