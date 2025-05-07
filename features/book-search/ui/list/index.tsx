'use client';

import { useBookSearchParams } from '../../lib/hooks/useBookSearchParams';
import { useBookSearchQuery } from '../../lib/query/useBookSearchQuery';
import { KakaoDocument } from '../../api/types';
import BookSearchItem from '../item';
import BookSearchListLoader from './loader';
import { useInfiniteScroll } from '@/shared/hooks/infinite-scroll';
import { cn } from '@/shared/utils/class-name';
import Loader from '@/shared/common/loader';

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
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);

  if (isLoading) return <BookSearchListLoader />;
  if (!data || !query || data.length === 0 || isError) {
    return null;
  }

  return (
    <div className={cn('w-full h-full overflow-scroll scrollbar-none')}>
      <ul
        className={cn(
          'w-full px-4 flex flex-col gap-4', // 기본 모바일 레이아웃
          'md:grid md:grid-cols-2 md:gap-4', // 작은 화면에서 2열로 변경
          'lg:grid lg:grid-cols-3 lg:gap-4', // 중간 화면에서 3열로 변경
          'xl:grid xl:grid-cols-4 xl:gap-4', // 큰 화면에서 4열로 변경
          '2xl:grid 2xl:grid-cols-5 2xl:gap-2' // 큰 화면에서 5열로 변경
        )}
      >
        {data.map((item: KakaoDocument) => (
          <BookSearchItem key={item.thumbnail} item={item} />
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
