'use client';

import { useMyBooks, MyBookItem } from '@/entities/my-book';
import { useFilterMyBookParams } from '@/features/filter-my-book';
import { useApiStatus } from '@/shared/api';
import { useInfiniteScroll } from '@/shared/hooks';
import { Spinner } from '@/shared/ui/spinner';
import { cn } from '@/shared/utils/class-name';

import { MyBookListEmpty } from './my-book-list-empty';
import { MyBookListLoader } from './my-book-list-loader';

/** 모바일 기본 뷰 — 상태 필터 하나에 대한 표지 그리드 */
export function MyBookGrid() {
  const { order, status } = useFilterMyBookParams();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useMyBooks({ order, status });
  const { isInitialized } = useApiStatus();
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);

  const renderContent = () => {
    if (!isInitialized || isLoading) return <MyBookListLoader />;
    if (!data || data.books.length === 0) return <MyBookListEmpty />;

    return (
      <>
        <ul
          className={cn(
            'w-full gap-2 grid px-2 grid-cols-3 flex-col', // 기본 모바일 레이아웃
            'sm:grid-cols-4 sm:gap-4', // 작은 화면에서 4열로 변경
            'md:grid-cols-5 md:gap-4', // 중간 화면에서 5열로 변경
            'lg:grid-cols-6 lg:gap-4', // 큰 화면에서 6열로 변경
            'xl:grid-cols-7 xl:gap-4', // 큰 화면에서 7열로 변경
            '2xl:grid-cols-10 2xl:gap-4 2xl:max-w-screen-2xl 2xl:mx-auto' // 2xl 이상에서 최대 너비 제한
          )}
        >
          {data.books.map(book => (
            <MyBookItem key={`${book.title}-${book.id}`} book={book} />
          ))}
        </ul>
        <div className="w-full flex justify-center p-4" ref={ref}>
          {isFetching && <Spinner size="sm" className="border-gray-800" />}
        </div>
      </>
    );
  };

  return <div className="flex-1 flex flex-col">{renderContent()}</div>;
}
