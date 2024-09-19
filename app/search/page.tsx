import dynamic from 'next/dynamic';
import SearchForm from './_components/search-form';

export default function SearchPage() {
  const DynamicSearchForm = dynamic(() => import('./_components/search-form'), {
    ssr: false,
  });

  return (
    <div className="w-full h-full">
      <div className="w-full min-h-[10%] flex justify-center items-center">
        {/* <SearchForm /> */}
        <DynamicSearchForm />
      </div>
      <div className="w-full h-[90%]">{/* <SearchList /> */}</div>
    </div>
  );
}
