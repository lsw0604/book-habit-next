'use client';

import { v4 } from 'uuid';
import { InfoIcon } from 'lucide-react';

import SearchItem from './search-item';
import Loader from '@/components/common/loader';
import { useSearchListHook } from '@/hooks/search/useSearchListHook';
import { cn } from '@/utils/class-name';

export default function SearchList() {
  const { ref, data, query, isLoading, isFetching } = useSearchListHook();

  if (isLoading) return <SearchList.Loader />;
  if (!data || !query || data.length === 0)
    return <SearchList.NotFound query={query} />;

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-scroll no-scrollbar">
      <ul
        className={cn(
          'w-full px-4 flex flex-col gap-4', // 기본 모바일 레이아웃
          'md:grid md:grid-cols-2 md:gap-4', // 작은 화면에서 2열로 변경
          'lg:grid lg:grid-cols-3 lg:gap-4', // 중간 화면에서 3열로 변경
          'xl:grid xl:grid-cols-4 xl:gap-4', // 큰 화면에서 4열로 변경
          '2xl:grid 2xl:grid-cols-5 2xl:gap-2' // 큰 화면에서 5열로 변경
        )}
      >
        {data.map((item: KakaoDocument) => (
          <SearchItem key={v4()} item={item} />
        ))}
      </ul>
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
      <ul className='className="w-full px-4 pb-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4'>
        {Array.from({ length: 20 }).map((_, index) => (
          <SearchItem.Loader key={index} />
        ))}
      </ul>
    </div>
  );
};

SearchList.Empty = function () {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="bg-[rgba(0,0,0,0.05)] w-full h-full rounded-lg" />
    </div>
  );
};

SearchList.NotFound = function ({ query }: { query?: string }) {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="bg-[rgba(0,0,0,0.05)] w-full h-full rounded-lg flex justify-center items-center text-slate-500 text-lg">
        {!query ? (
          <span className="flex">찾고싶은 내용을 검색해주세요.</span>
        ) : (
          <h1 className="px-10 pb-10">
            <div className="w-full flex justify-center mb-2">
              <InfoIcon className="w-12 h-12" />
            </div>
            <span className="text-slate-600 font-bold text-lg mr-2">
              {query}
            </span>
            에 대한 검색결과가 없습니다.
          </h1>
        )}
      </div>
    </div>
  );
};
