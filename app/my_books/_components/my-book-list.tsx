'use client';

import Link from 'next/link';
import Loader from '@/components/common/loader';
import MyBookItem from './my-book-item';
import useMyBookListHook from '@/hooks/my-book/useMyBookListHook';
import { cn } from '@/utils/class-name';

export default function MyBookList() {
  const { data, ref, isFetching, isError, error, isLoading } =
    useMyBookListHook();

  if (isLoading) return <MyBookList.Loader />;
  if (isError && error?.status === 401) return <MyBookList.LoginError />;
  if (data?.books.length === 0) return <MyBookList.Empty />;

  return (
    <div className={cn('w-full h-full overflow-scroll no-scrollbar')}>
      <ul
        className={cn(
          'w-full grid px-2 grid-cols-3 flex-col', // 기본 모바일 레이아웃
          'sm:grid-cols-4 sm:gap-2', // 작은 화면에서 4열로 변경
          'md:grid-cols-5 md:gap-2', // 중간 화면에서 5열로 변경
          'lg:grid-cols-6 lg:gap-2', // 큰 화면에서 6열로 변경
          'xl:grid-cols-7 xl:gap-2', // 큰 화면에서 7열로 변경
          '2xl:grid-cols-10 2xl:gap-2' // 큰 화면에서 10열로 변경
        )}
      >
        {data?.books.map((item) => (
          <MyBookItem key={item.thumbnail} {...item} />
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

MyBookList.Loader = function () {
  return (
    <div className={cn('w-full h-full overflow-scroll no-scrollbar')}>
      <ul
        className={cn(
          'w-full grid px-2 grid-cols-3 flex-col', // 기본 모바일 레이아웃
          'sm:grid-cols-4 sm:gap-2', // 작은 화면에서 4열로 변경
          'md:grid-cols-5 md:gap-2', // 중간 화면에서 5열로 변경
          'lg:grid-cols-6 lg:gap-2', // 큰 화면에서 6열로 변경
          'xl:grid-cols-7 xl:gap-2', // 큰 화면에서 7열로 변경
          '2xl:grid-cols-10 2xl:gap-2' // 큰 화면에서 10열로 변경
        )}
      >
        {Array.from({ length: 30 }).map((_, index) => (
          <MyBookItem.Loader key={index} />
        ))}
      </ul>
    </div>
  );
};

MyBookList.Empty = function () {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="flex justify-center items-center w-full h-full bg-[rgba(0,0,0,0.05)] rounded-lg">
        <p className="text">해당 상태로 등록된 책이 없습니다.</p>
      </div>
    </div>
  );
};

MyBookList.LoginError = function () {
  return (
    <div className="w-full h-full px-4 pb-4">
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full bg-[rgba(0,0,0,0.05)] rounded-lg">
        <h1 className="text-xl font-bold text-gray-400">
          해당 페이지는 로그인이 필요합니다
        </h1>
        <Link
          className="text-xl font-bold text-gray-400 hover:underline"
          href="/login"
        >
          로그인하러가기
        </Link>
      </div>
    </div>
  );
};
