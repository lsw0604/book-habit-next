import SearchForm from './_components/search-form';
import SearchList from './_components/search-list';

export default function SearchPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-center items-center p-2">
        <SearchForm />
      </div>
      <div className="flex-1 overflow-auto">
        <SearchList />
      </div>
    </div>
  );
}
