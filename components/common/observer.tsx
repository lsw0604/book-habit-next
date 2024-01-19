'use client';

import { MutableRefObject } from 'react';
import { useIntersectionObserver, useUpdateEffect } from 'usehooks-ts';

interface ObserverProps {
  observerRef: MutableRefObject<HTMLDivElement | null>;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetching: boolean;
}

const OBSERVER_OPTION = {
  root: null,
  rootMargin: '20px',
  threshold: 1.0,
};

export default function Observer({
  observerRef,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: ObserverProps) {
  const entry = useIntersectionObserver(observerRef, OBSERVER_OPTION);
  const isVisible = !!entry?.isIntersecting;

  useUpdateEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
    console.log(isVisible);
  }, [fetchNextPage, hasNextPage, isFetching]);

  return <div ref={observerRef} />;
}
