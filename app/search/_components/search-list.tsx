'use client';

import { v4 } from 'uuid';

import SearchItem from './search-item';
import SearchListEmpty from './search-list-empty';
import Loader from '@/components/common/loader';
import { useSearchListHook } from '@/hooks/search/useSearchListHook';

export default function SearchList() {
  const { ref, data, query, isLoading, isFetching } = useSearchListHook();

  if (isLoading) return <SearchList.Loader />;
  if (!data || !query || data?.pages[0].documents.length === 0)
    return <SearchListEmpty />;

  const items = data?.pages.flatMap((page) => page.documents);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-scroll">
      <div className="w-full px-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4">
        {items.map((item) => (
          <SearchItem key={v4()} item={item} />
        ))}
      </div>
      {isFetching ? (
        <div className="w-full justify-center flex mb-1">
          <Loader size={2} className="border-gray-800" />
        </div>
      ) : (
        <div className="mb-[20px]" ref={ref} />
      )}
    </div>
  );
}

SearchList.Loader = function () {
  return (
    <div className="w-full h-full flex flex-col overflow-scroll">
      <div className='className="w-full px-4 pb-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4'>
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
        <SearchItem.Loader />
      </div>
    </div>
  );
};
