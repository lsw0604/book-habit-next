'use client';

import searchParams from '@/hooks/search/searchParams';
import useInfiniteScroll from '@/hooks/infinite-scroll/useInfiniteScroll';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useInfiniteSearchBook from '@/queries/search/useInfinitySearchBook';

export const useSearchListHook = () => {
  const { query, size, sort, target } = searchParams();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteSearchBook({ query, size, sort, target });

  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);

  useErrorHandler(isError, error);

  return {
    data,
    isLoading,
    query,
    isFetching,
    hasNextPage,
    ref,
  };
};
