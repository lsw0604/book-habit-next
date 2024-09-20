'use client';

import { OBSERVER_OPTION } from '@/constant/observer-option';
import { getSearchParams } from '@/domain/search/get-search-params';
import { useInfiniteSearchBook } from '@/queries/search/useInfinitySearchBook';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

export const useSearchListHook = () => {
  const searchParams = useSearchParams();
  const { ref, isIntersecting } = useIntersectionObserver({
    ...OBSERVER_OPTION,
  });
  const { query, size, sort, target } = getSearchParams(searchParams);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteSearchBook({ query, size, sort, target });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isIntersecting]);

  return { ref, data, query, isLoading, isFetching, hasNextPage };
};
