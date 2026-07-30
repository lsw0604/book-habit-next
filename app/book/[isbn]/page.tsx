import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { bookService } from '@/entities/book';
import { getQueryClient, queryKeys } from '@/shared/query';
import { SearchedBookDetail } from '@/widgets/searched-book-detail';

export default async function BookPage({
  params: { isbn },
}: {
  params: { isbn: string };
}) {
  const { fetchBookDetail } = bookService;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: queryKeys.book.isbn(isbn).queryKey,
    queryFn: () => fetchBookDetail(isbn),
  });

  const dehydration = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydration}>
      <SearchedBookDetail isbn={isbn} />
    </HydrationBoundary>
  );
}
