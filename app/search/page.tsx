import { BookSearchList } from '@/widgets/book-search-list';
import { BookSearchBar } from '@/features/book-search';
import { FixedHeaderPageLayout } from '@/shared/ui/fixed-header-page-layout';

export default function SearchPage() {
  return (
    <FixedHeaderPageLayout header={<BookSearchBar />}>
      <BookSearchList />
    </FixedHeaderPageLayout>
  );
}
