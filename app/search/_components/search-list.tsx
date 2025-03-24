'use client';

import type { KakaoDocument } from '@/service/api/search/types';
import SearchItem from './search-item';
import SearchListLoader from './search-list-loader';
import SearchListNotFound from './search-list-not-found';
import Loader from '@/components/common/loader';

import useParsedSearchParams from '@/hooks/search/useParsedSearchParams';
import useInfiniteScroll from '@/hooks/infinite-scroll/useInfiniteScroll';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import { useSearch } from '@/hooks/search/useSearchQuery';

import { cn } from '@/utils/class-name';

export default function SearchList() {
  const { query, size, sort, target } = useParsedSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useSearch({ query, size, sort, target });
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);
  useErrorHandler(isError, error);

  if (isLoading) return <SearchListLoader />;
  if (!data || !query || data.length === 0 || isError)
    return (
      <SearchListNotFound
        query={query}
        isError={isError}
        errorMessage={error?.response?.data.message}
        refetch={() => refetch()}
      />
    );

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
          <SearchItem key={item.isbn} item={item} />
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
