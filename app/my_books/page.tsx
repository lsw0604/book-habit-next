import { FilterMyBookBar } from '@/features/filter-my-book';
import { StickyHeaderPageLayout } from '@/shared/ui/sticky-header-page-layout';
import { MyBookList } from '@/widgets/my-book-list';

export default function MyBookPage() {
  return (
    <StickyHeaderPageLayout header={<FilterMyBookBar />}>
      <MyBookList />
    </StickyHeaderPageLayout>
  );
}
