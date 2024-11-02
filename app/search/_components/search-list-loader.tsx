import { SearchItemLoader } from './search-item-loader';

export default function SearchListLoader() {
  return (
    <div className="w-full h-full flex flex-col overflow-scroll scrollbar-none">
      <ul className='className="w-full px-4 pb-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4'>
        {Array.from({ length: 20 }).map((_, index) => (
          <SearchItemLoader key={index} />
        ))}
      </ul>
    </div>
  );
}
