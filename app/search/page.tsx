import type { Metadata } from 'next';

import { BookSearchBar } from '@/features/book-search';
import { FixedHeaderPageLayout } from '@/shared/ui/fixed-header-page-layout';
import { BookSearchList } from '@/widgets/book-search-list';

export const metadata: Metadata = {
  title: '책 검색',
};

export default function SearchPage() {
  return (
    <FixedHeaderPageLayout header={<BookSearchBar />}>
      <BookSearchList />
    </FixedHeaderPageLayout>
  );
}
