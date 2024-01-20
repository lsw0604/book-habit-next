import { Suspense } from 'react';

import SearchList from './_components/search-list';
import SearchInput from './_components/search-input';

export default async function SearchPage() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[10%] flex justify-center items-center">
        <SearchInput />
      </div>
      <div className="w-full h-[90%]">
        <Suspense>
          <SearchList />
        </Suspense>
      </div>
    </div>
  );
}
