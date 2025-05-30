'use client';

import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { observerOption } from './util';

export const useInfiniteScroll = (
  fetchNextPage: () => void,
  hasNextPage: boolean
) => {
  const { isIntersecting, ref } = useIntersectionObserver(
    observerOption({ threshold: 0.5 })
  );

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      const timer = setTimeout(() => fetchNextPage(), 0);
      return () => clearTimeout(timer);
    }
  }, [hasNextPage, isIntersecting]);

  return ref;
};
