import { MyBookFilterBar } from '@/widgets/my-book-filter-bar';
import { MyBookList } from '@/widgets/my-book-list';
import PageContainer from '@/shared/common/page-container';

export default function MyBookPage() {
  return (
    <PageContainer variant="vertical" className="h-full">
      <div className="w-full flex justify-center bg-white sticky top-16 z-10">
        <MyBookFilterBar />
      </div>
      <div className="flex-1 overflow-auto">
        <MyBookList />
      </div>
    </PageContainer>
  );
}
