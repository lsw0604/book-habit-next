import SearchList from './_components/search-list';
import SearchInput from './_components/search-input';
import SearchForm from './_components/search-form';

export default function SearchPage() {
  return (
    <div className="w-full h-full">
      <div className="w-full min-h-[10%] flex justify-center items-center">
        {/* <SearchInput /> */}
        <SearchForm />
      </div>
      <div className="w-full h-[90%]">{/* <SearchList /> */}</div>
    </div>
  );
}
