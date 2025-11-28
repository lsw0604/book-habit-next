import { BookSearchList } from '@/features/book-search-list';
import { StickyHeaderPageLayout } from '@/shared/ui/sticky-header-page-layout';
import { BookSearchBar } from '@/widgets/book-search-bar';

export default function SearchPage() {
  return (
    <StickyHeaderPageLayout
      header={<BookSearchBar />}
      headerClassName="p-4"
      contentClassName="px-4"
    >
      <BookSearchList />
    </StickyHeaderPageLayout>
  );
}
