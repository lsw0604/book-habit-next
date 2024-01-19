'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import SearchItem from './search-item';
import useBookSearchInfinityQuery from '@/queries/book/useBookSearchInfinityQuery';
import { v4 } from 'uuid';
import Observer from '@/components/common/observer';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function SearchList() {
  const lastSearchRef = useRef<HTMLDivElement | null>(null);

  const searchParams = useSearchParams();

  const keyword =
    searchParams.get('keyword') !== null
      ? (searchParams.get('keyword') as string)
      : undefined;

  const { data, fetchNextPage, hasNextPage, isFetching } =
    useBookSearchInfinityQuery(keyword);

  if (!data) return null;
  if (keyword === undefined) return null;

  const _document = data.pages.flatMap((page) => page.documents);

  const entry = useIntersectionObserver(lastSearchRef, OBSERVER_OPTION);
  const isVisible = !!entry?.isIntersecting;

  useUpdateEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, entry, isFetching]);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-scroll">
      <div className="w-full p-4 gap-4 md:grid md:grid-cols-2 md:gap-4 xl:grid xl:grid-cols-5 xl:gap-4">
        {_document.map((item) => (
          <SearchItem key={v4()} item={item} search={keyword} />
        ))}
      </div>
      <div ref={lastSearchRef} />
    </div>
  );
}
