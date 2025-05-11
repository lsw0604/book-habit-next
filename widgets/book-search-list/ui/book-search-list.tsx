'use client';

import type { KakaoDocument } from '@/features/book-search/api/types';
import { useBookSearchParams } from '@/features/book-search/lib/hooks';
import { useBookSearchQuery } from '@/features/book-search/lib/query';
import BookSearchListLoader from './book-search-list-loader';
import BookSearchListNotFound from './book-search-list-not-found';
import BookSearchItem from './book-search-item';
import Loader from '@/shared/common/loader';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { cn } from '@/shared/utils/class-name';

export default function BookSearchList() {
  const { query, size, sort, target } = useBookSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useBookSearchQuery({ query, size, sort, target });
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage, {
    threshold: 0.3,
  });

  if (isLoading) return <BookSearchListLoader />;
  if (!data || !query || data.length === 0 || isError)
    return (
      <BookSearchListNotFound
        query={query}
        isError={isError}
        errorMessage={error?.response?.data.message}
        refetch={refetch}
      />
    );

  return (
    <div className={cn('w-full h-full overflow-scroll scrollbar-none')}>
      <ul
        className={cn(
          'w-full px-4 flex flex-col gap-4 mb-2', // 기본 모바일 레이아웃
          'md:grid md:grid-cols-2 md:gap-4', // 작은 화면에서 2열로 변경
          'lg:grid lg:grid-cols-3 lg:gap-4', // 중간 화면에서 3열로 변경
          'xl:grid xl:grid-cols-4 xl:gap-4', // 큰 화면에서 4열로 변경
          '2xl:grid 2xl:grid-cols-5 2xl:gap-2' // 큰 화면에서 5열로 변경
        )}
      >
        {data.map((item: KakaoDocument) => (
          <BookSearchItem key={item.isbn} item={item} />
        ))}
      </ul>
      <div className="w-full flex justify-center p-4" ref={ref}>
        {isFetching && <Loader size={2} className="border-gray-800" />}
      </div>
    </div>
  );
}
