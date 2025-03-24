import SearchForm from './_components/search-form';
import SearchList from './_components/search-list';
import PageContainer from '@/components/common/page-container';

export default function SearchPage() {
  return (
    <PageContainer variant="vertical" className="h-full">
      <div className="w-full flex justify-center bg-white sticky top-16 z-10">
        <SearchForm />
      </div>
      <div className="flex-1 overflow-auto">
        <SearchList />
      </div>
    </PageContainer>
  );
}
