import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIntersectionObserver } from 'usehooks-ts';

import { myBookParam } from '@/service/my-book/myBookParam';
import useToastHook from '@/hooks/toast/useToastHook';
import useInfiniteMyBook from '@/queries/my-book/useInfinityMyBook';
import { OBSERVER_OPTION } from '@/constant/observer-option';

export default function useGetMyBookListHook() {
  const searchParams = useSearchParams();
  const { ref, isIntersecting } = useIntersectionObserver({
    ...OBSERVER_OPTION,
  });
  const { order, status } = myBookParam(searchParams);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteMyBook({ order, status });
  const { errorToast } = useToastHook();

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, isIntersecting]);

  useEffect(() => {
    if (isError && error) {
      errorToast(error.message);
    }
  }, [isError, error]);

  return {
    ref,
    data,
    isLoading,
    isFetching,
  };
}
