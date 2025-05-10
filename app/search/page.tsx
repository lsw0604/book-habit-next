import PageContainer from '@/shared/common/page-container';
import BookSearchForm from '@/widgets/book-search/ui/form';
import BookSearchList from '@/widgets/book-search/ui/list';

export default function SearchPage() {
  return (
    <PageContainer variant="vertical" className="h-full">
      <div className="w-full flex justify-center bg-white sticky top-16 z-10">
        <BookSearchForm />
      </div>
      <div className="flex-1 overflow-auto">
        <BookSearchList />
      </div>
    </PageContainer>
  );
}
