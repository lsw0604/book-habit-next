'use client';

import MyBookItem from './my-book-item';
import MyBookListLoader from './my-book-list-loader';
import MyBookListNotFound from './my-book-list-not-found';
import MyBookListLoginError from './my-book-list-login-error';
import { useMyBookFilterParams } from '@/features/filter-my-book/lib/hooks';
import { useMyBooks } from '@/features/filter-my-book/lib/query';
import Loader from '@/shared/common/loader';
import { cn } from '@/shared/utils/class-name';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import MyBookListEmpty from './my-book-list-empty';

export default function MyBookList() {
  const { order, status } = useMyBookFilterParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useMyBooks({ order, status });
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (isLoading) return <MyBookListLoader />;
  if (isError && error.status === 401) return <MyBookListLoginError />;
  if (!data) return <MyBookListEmpty />;
  if (data.books.length === 0) return <MyBookListNotFound />;

  return (
    <div>
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
        {data.books.map(book => (
          <MyBookItem key={`${book.title}-${book.id}`} book={book} />
        ))}
      </ul>
      <div className="w-full flex justify-center p-4" ref={ref}>
        {isFetching && <Loader size={2} className="border-gray-800" />}
      </div>
    </div>
  );
}
