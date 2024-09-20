import SearchForm from './_components/search-form';
import SearchList from './_components/search-list';

export default function SearchPage() {
  return (
    <div className="w-full h-full">
      <div className="w-full min-h-[10%] flex justify-center items-center">
        <SearchForm />
      </div>
      <div className="w-full h-[90%]">
        <SearchList />
      </div>
    </div>
  );
}
