import { BookSearchForm, BookSearchList } from '@/features/book-search';
import PageContainer from '@/shared/common/page-container';

export default function SearchPage() {
  return (
    <PageContainer variant="vertical" className="h-full">
      <div className="w-full flex justify-center bg-white sticky top-16 z-10 p-4">
        <BookSearchForm />
      </div>
      <div className="flex-1 overflow-auto">
        <BookSearchList />
      </div>
    </PageContainer>
  );
}
