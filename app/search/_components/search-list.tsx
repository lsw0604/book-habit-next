'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';
import { v4 } from 'uuid';

import SearchItem from './search-item';
import { Skeleton } from '@/components/ui/skeleton';
import useBookSearchInfinityQuery from '@/queries/book/useBookSearchInfinityQuery';

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function SearchList() {
  const lastSearchRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(lastSearchRef, OBSERVER_OPTION);
  const isVisible = !!entry?.isIntersecting;

  const searchParams = useSearchParams();

  const keyword =
    searchParams.get('keyword') !== null
      ? (searchParams.get('keyword') as string)
      : undefined;

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useBookSearchInfinityQuery(keyword);

  useUpdateEffect(() => {
    if (isVisible && hasNextPage) {
      fetchNextPage();
    }
  }, [isVisible]);

  if (isLoading || !data) return <SearchList.Loader />;
  if (keyword === undefined) return <SearchList.Empty keyword={keyword} />;
  if (data?.pages[0].documents.length === 0)
    return <SearchList.Empty keyword={keyword} />;

  const _document = data?.pages.flatMap((page) => page.documents);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-scroll">
      <div className="w-full p-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4">
        {_document?.map((item) => (
          <SearchItem key={v4()} item={item} search={keyword} />
        ))}
      </div>
      <div className="mb-[20px]" ref={lastSearchRef} />
    </div>
  );
}

SearchList.Loader = function () {
  return (
    <div className="w-full h-full flex flex-col overflow-scroll">
      <div className='className="w-full p-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4'>
        <div className="w-full min-h-[350px] h-auto flex flex-col gap-4 p-4 rounded-2xl border-[none] shadow-lg">
          <div className="flex justify-center items-center">
            <Skeleton className="w-[120px] h-[174px] bg-slate-200" />
          </div>
          <div className="w-full h-full">
            <Skeleton className="w-full h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[300px] h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[250px] h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
          </div>
        </div>
        <div className="w-full min-h-[350px] h-auto flex flex-col gap-4 p-4 rounded-2xl border-[none] shadow-lg">
          <div className="flex justify-center items-center">
            <Skeleton className="w-[120px] h-[174px] bg-slate-200" />
          </div>
          <div className="w-full h-full">
            <Skeleton className="w-full h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[300px] h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[250px] h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
            <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

SearchList.Empty = function ({ keyword }: { keyword?: string }) {
  return (
    <div className="w-full h-full p-4">
      <div className="bg-[rgba(0,0,0,0.05)] w-full h-full rounded-lg flex justify-center items-center">
        {!keyword ? (
          <span className="flex text-lg text-slate-500">
            책 제목을 검색해주세요.
          </span>
        ) : (
          <span className="flex text-lg text-slate-500">
            <p className="text-lg text-cyan-300">{keyword}</p>에 대한 검색결과가
            없습니다.
          </span>
        )}
      </div>
    </div>
  );
};
