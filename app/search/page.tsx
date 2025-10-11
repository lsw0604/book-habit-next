import { BookSearchList } from '@/features/book-search';
import { PageContainer } from '@/shared/ui/page-container';
import { BookSearchBar } from '@/widgets/book-search-bar';

export default function SearchPage() {
  return (
    <PageContainer variant="vertical" className="h-full">
      <div className="w-full flex justify-center bg-white sticky top-16 z-10 p-4">
        <BookSearchBar />
      </div>
      <div className="flex-1 overflow-auto px-4">
        <BookSearchList />
      </div>
    </PageContainer>
  );
}
