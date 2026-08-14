'use client';

import {
  getMyBookStatusLabel,
  useMyBooks,
  MyBookRow,
  type MyBookStatus,
} from '@/entities/my-book';
import type { FilterMyBookOrder } from '@/features/filter-my-book';
import { useInfiniteScroll } from '@/shared/hooks';
import { Skeleton } from '@/shared/ui/skeleton';
import { Spinner } from '@/shared/ui/spinner';

interface MyBookBoardColumnProps {
  status: MyBookStatus;
  order: FilterMyBookOrder;
}

function MyBookBoardColumnLoader() {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={index} className="flex gap-3 rounded-lg border border-gray-200 bg-white p-2">
          <Skeleton className="h-[68px] w-[51px] shrink-0 rounded" />
          <div className="flex flex-1 flex-col justify-between py-0.5">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-3 w-16" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MyBookBoardColumn({ status, order }: MyBookBoardColumnProps) {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useMyBooks({ order, status });
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);

  const isShowLoader = isLoading;
  const totalCount = data?.meta?.totalCount ?? 0;

  const renderContent = () => {
    if (isShowLoader) return <MyBookBoardColumnLoader />;

    if (!data || data.books.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center rounded-lg bg-[rgba(0,0,0,0.03)] p-6">
          <p className="text-sm text-gray-400">아직 없습니다.</p>
        </div>
      );
    }

    return (
      <>
        <ul className="flex flex-col gap-2">
          {data.books.map(book => (
            <MyBookRow key={`${book.title}-${book.id}`} book={book} />
          ))}
        </ul>
        <div className="flex w-full justify-center py-3" ref={ref}>
          {isFetching && <Spinner size="sm" className="border-gray-800" />}
        </div>
      </>
    );
  };

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-xl bg-gray-50 p-3">
      <header className="mb-3 flex shrink-0 items-center justify-between px-1">
        <h2 className="text-sm font-bold text-gray-900">
          {getMyBookStatusLabel(status)}
        </h2>
        {!isShowLoader && (
          <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-gray-500">
            {totalCount}
          </span>
        )}
      </header>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto scrollbar-none">
        {renderContent()}
      </div>
    </section>
  );
}
