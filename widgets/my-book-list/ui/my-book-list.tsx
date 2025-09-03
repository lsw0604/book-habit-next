'use client';

import { useMyBooks } from '@/entities/my-book/hooks';
import { MyBookItem } from '@/entities/my-book/ui';
import { useFilterMyBookParams } from '@/features/filter-my-book/hooks';
import Loader from '@/shared/common/loader';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { cn } from '@/shared/utils/class-name';

import { MyBookListEmpty } from './my-book-list-empty';
import { MyBookListLoader } from './my-book-list-loader';
import { MyBookListLoginError } from './my-book-list-login-error';
import { MyBookListNotFound } from './my-book-list-not-found';

export function MyBookList() {
  const { order, status } = useFilterMyBookParams();
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
    <div className={cn('w-full h-full overflow-scroll scrollbar-none')}>
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
        {isFetching && <Loader size={2} className="border-gray-800" />}
      </div>
    </div>
  );
}
