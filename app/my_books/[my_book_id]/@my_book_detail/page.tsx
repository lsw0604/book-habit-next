import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import MyBookDetail from './_components/my-book-detail';
import { getQueryClient } from '@/providers/get-query';
import { queryKeys } from '@/constant/queries-key';
import { getMyBookDetailAPI } from '@/service/my-book';

export default async function MyBookDetailPage({
  params,
}: {
  params: { my_book_id: string };
}) {
  const { my_book_id } = params;
  const myBookId = parseInt(my_book_id, 10);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [queryKeys.myBook.getDetail(myBookId)],
    queryFn: () => getMyBookDetailAPI(myBookId),
  });
  const dehydrateState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydrateState}>
      <MyBookDetail myBookId={myBookId} />
    </HydrationBoundary>
  );
}
