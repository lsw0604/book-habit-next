// import useMyBookCommentQuery from '@/queries/my-book-comment/useMyBookCommentQuery';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { queryKeys } from '@/constant/queries-key';
import { getQueryClient } from '@/providers/get-query';
import { getMyBookCommentListAPI } from '@/service/my-book-comment';
import HydrationProvider from '@/providers/hydration-provider';
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
  // const { data, isError, error, isLoading } = useMyBookCommentQuery({
  //   myBookId: params.my_book_id,
  // });

  // if (isLoading || !data) return <div>loading...</div>;

  return (
    <HydrationProvider>
      <div className="h-full flex-1 overflow-auto scroll">
        <HydrationBoundary state={dehydrateState}>
          <MyBookCommentList my_book_id={params.my_book_id} />
        </HydrationBoundary>
      </div>
    </HydrationProvider>
  );
}
