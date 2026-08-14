import type { Metadata } from 'next';

import { FilterMyBookBar } from '@/features/filter-my-book';
import { FixedHeaderPageLayout } from '@/shared/ui/fixed-header-page-layout';
import { MyBookList } from '@/widgets/my-book-list';

export const metadata: Metadata = {
  title: '내 서재',
};

/**
 * PC에서는 칸반 보드가 뷰포트에 고정되고 컬럼이 각자 스크롤되므로 fitViewport로 둔다.
 * 모바일 그리드도 같은 규칙 아래에서 자체 스크롤을 갖는다.
 */
export default function MyBookPage() {
  return (
    <FixedHeaderPageLayout fitViewport header={<FilterMyBookBar />}>
      <MyBookList />
    </FixedHeaderPageLayout>
  );
}
