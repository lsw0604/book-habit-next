import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { myBookQueryKeys, myBookService } from '@/entities/my-book';
import {
  myBookHistoryQueryKeys,
  myBookHistoryService,
} from '@/entities/my-book-history';
import {
  myBookReviewQueryKeys,
  myBookReviewService,
} from '@/entities/my-book-review';
import { withServerAuth } from '@/shared/api/server';
import { getQueryClient } from '@/shared/query';
import { ClientWrapper } from '@/shared/ui/client-wrapper';
import { PageContainer } from '@/shared/ui/page-container';
import { MyBookDetail } from '@/widgets/my-book-detail';
import { MyBookHistoryDetail } from '@/widgets/my-book-history-detail';
import { MyBookReviewDetail } from '@/widgets/my-book-review-detail';

export default async function MyBookDetailPage({
  params,
}: {
  params: {
    my_book_id: string;
  };
}) {
  const myBookId = Number(params.my_book_id);
  const queryClient = getQueryClient();
  const authConfig = withServerAuth();

  /**
   * 세 위젯이 각자 쓰는 쿼리를 미리 채운다.
   * prefetchQuery는 실패해도 throw하지 않고, dehydrate는 성공한 쿼리만 담는다.
   * 따라서 비로그인/401이면 조용히 건너뛰고 클라이언트가 평소처럼 다시 요청한다.
   */
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: myBookQueryKeys.detail(myBookId).queryKey,
      queryFn: () => myBookService.getMyBook(myBookId, authConfig),
    }),
    queryClient.prefetchQuery({
      queryKey: myBookHistoryQueryKeys.list(myBookId).queryKey,
      queryFn: () =>
        myBookHistoryService.getMyBookHistories(myBookId, authConfig),
    }),
    queryClient.prefetchQuery({
      queryKey: myBookReviewQueryKeys.detail(myBookId).queryKey,
      queryFn: () => myBookReviewService.getMyBookReview(myBookId, authConfig),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer className="p-2">
        <ClientWrapper>
          <MyBookDetail myBookId={myBookId} />
        </ClientWrapper>
        <ClientWrapper>
          <MyBookHistoryDetail myBookId={myBookId} />
        </ClientWrapper>
        <ClientWrapper>
          <MyBookReviewDetail myBookId={myBookId} />
        </ClientWrapper>
      </PageContainer>
    </HydrationBoundary>
  );
}
