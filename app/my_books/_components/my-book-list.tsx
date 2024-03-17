'use client';

import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';

import MyBookItem from './my-book-item';

import useMyBookListInfinityQuery from '@/queries/myBook/useMyBookListInfinityQuery';

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 0.7,
};

export default function MyBookList() {
  const lastPageRef = useRef<HTMLDivElement>(null);

  const { get } = useSearchParams();
  const category = get('category') as SelectorBookType;

  const entry = useIntersectionObserver(lastPageRef, OBSERVER_OPTION);

  const isVisible = !!entry?.isIntersecting;

  const { data, fetchNextPage, isLoading, hasNextPage } =
    useMyBookListInfinityQuery(category);

  useUpdateEffect(() => {
    if (isVisible && hasNextPage === true) {
      fetchNextPage();
    }
  }, [isVisible, hasNextPage]);

  if (!data || isLoading) return <MyBookList.Loader />;
  if (data.pages.length === 0) return <MyBookList.Empty />;

  const _document = data.pages.flatMap((page) => page.books);

  return (
    // <div className="w-full h-full flex flex-col overflow-scroll border-2 border-black border-solid">
    <div className="w-full h-auto">
      <ul className="w-full grid gap-4 px-4 mb-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-5 md:gap-2 2xl:grid-cols-10 2xl:gap-2 last:mb-0">
        {_document.map((page) => (
          <MyBookItem key={page.id} item={page} />
        ))}
      </ul>
      <div className="mb-[20px]" ref={lastPageRef}></div>
    </div>
  );
}

MyBookList.Empty = function () {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.05)] rounded-lg">
        <p className="text">해당 상태로 등록된 책이 없습니다.</p>
      </div>
    </div>
  );
};

MyBookList.Loader = function () {
  return (
    <div className="w-full h-full flex flex-col overflow-scroll">
      <ul className="w-full grid gap-4 px-4 mb-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-5 md:gap-2 2xl:grid-cols-10 2xl:gap-2 last:mb-0">
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
        <MyBookItem.Loader />
      </ul>
    </div>
  );
};
