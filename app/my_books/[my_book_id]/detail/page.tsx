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
      {/**
       * PC는 두 컬럼이 각자 스크롤하고 페이지 자체는 뷰포트에 고정된다(칸반과 같은 방식).
       * sticky를 쓰지 않는 이유: 좌측 컬럼이 뷰포트보다 높아서 sticky로는 고정되지 않고
       * 아래쪽을 보여주려 함께 밀려 올라간다. 독립 스크롤이라 컬럼 높이에 제약이 없다.
       *
       * lg:min-h-0은 fitViewport가 하는 일을 PC에서만 적용한 것이다.
       * 모바일에서는 이 클래스들이 전부 꺼져 페이지가 늘어나고 main이 스크롤한다.
       * DOM 순서가 곧 모바일 순서이므로 모바일 레이아웃은 그대로 유지된다.
       */}
      <PageContainer className="p-2 lg:min-h-0 lg:p-6">
        <div className="mx-auto w-full lg:grid lg:min-h-0 lg:max-w-[1200px] lg:flex-1 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-x-8">
          {/* 참조 영역 — 표지·서지·상태 변경·책 소개 */}
          <aside className="lg:min-h-0 lg:overflow-y-auto lg:scrollbar-none">
            <ClientWrapper>
              <MyBookDetail myBookId={myBookId} />
            </ClientWrapper>
          </aside>

          {/* 작업 영역 — 독서 기록과 한줄평 */}
          <div className="flex flex-col lg:min-h-0 lg:overflow-y-auto lg:scrollbar-none">
            <ClientWrapper>
              <MyBookHistoryDetail myBookId={myBookId} />
            </ClientWrapper>
            <ClientWrapper>
              <MyBookReviewDetail myBookId={myBookId} />
            </ClientWrapper>
          </div>
        </div>
      </PageContainer>
    </HydrationBoundary>
  );
}
