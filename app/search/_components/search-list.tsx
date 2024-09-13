'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { v4 } from 'uuid';

import SearchItem from './search-item';
import SearchListEmpty from './search-list-empty';
import useBookSearchInfinityQuery from '@/queries/book/useBookSearchInfinityQuery';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserverHook';

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function SearchList() {
  const { ref, isIntersecting } = useIntersectionObserver({
    ...OBSERVER_OPTION,
  });

  const searchParams = useSearchParams();

  const keyword =
    searchParams.get('keyword') !== null
      ? (searchParams.get('keyword') as string)
      : undefined;

  const { data, fetchNextPage, hasNextPage, isLoading } =
    useBookSearchInfinityQuery(keyword);

  useEffect(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, ref]);

  if (keyword === undefined) return <SearchListEmpty keyword={keyword} />;

  if (isLoading || !data) return <SearchList.Loader />;
  if (data?.pages[0].documents.length === 0)
    return <SearchListEmpty keyword={keyword} />;

  const _document = data?.pages.flatMap((page) => page.documents);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-scroll">
      <div className="w-full px-4 pb-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4">
        {_document?.map((item) => (
          <SearchItem key={v4()} item={item} search={keyword as string} />
        ))}
      </div>
      <div className="mb-[20px]" ref={ref} />
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
