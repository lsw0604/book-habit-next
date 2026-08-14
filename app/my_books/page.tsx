import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';

import { myBookQueryKeys, myBookService } from '@/entities/my-book';
import {
  FilterMyBookBar,
  parseFilterMyBookParams,
  type RawFilterMyBookParams,
} from '@/features/filter-my-book';
import { withServerAuth } from '@/shared/api/server';
import { getQueryClient } from '@/shared/query';
import { FixedHeaderPageLayout } from '@/shared/ui/fixed-header-page-layout';
import { MyBookList } from '@/widgets/my-book-list';

export const metadata: Metadata = {
  title: '내 서재',
};

/**
 * PC에서는 칸반 보드가 뷰포트에 고정되고 컬럼이 각자 스크롤되므로 fitViewport로 둔다.
 * 모바일 그리드도 같은 규칙 아래에서 자체 스크롤을 갖는다.
 */
export default async function MyBookPage({
  searchParams,
}: {
  searchParams: RawFilterMyBookParams;
}) {
  const params = parseFilterMyBookParams(searchParams);
  const queryClient = getQueryClient();

  /**
   * 필터가 적용된 목록(모바일 그리드가 쓰는 쿼리)을 미리 채운다.
   * PC 칸반은 상태별로 쿼리가 3개라 서버에서 뷰포트를 알 수 없어 대상에서 제외했다.
   */
  await queryClient.prefetchInfiniteQuery({
    queryKey: myBookQueryKeys.list(params).queryKey,
    queryFn: () =>
      myBookService.getMyBooks({ ...params, page: 1 }, withServerAuth()),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FixedHeaderPageLayout fitViewport header={<FilterMyBookBar />}>
        <MyBookList />
      </FixedHeaderPageLayout>
    </HydrationBoundary>
  );
}
