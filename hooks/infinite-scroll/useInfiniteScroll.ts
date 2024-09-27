import { OBSERVER_OPTION } from '@/constant/observer-option';
import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

export default function useInfiniteScroll(
  fetchNextPage: () => void,
  hasNextPage: boolean
) {
  const { isIntersecting, ref } = useIntersectionObserver(OBSERVER_OPTION);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isIntersecting]);

  return ref;
}
