import useMyBookParams from '@/hooks/my-book/useMyBookParams';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useInfiniteScroll from '@/hooks/infinite-scroll/useInfiniteScroll';
import useMyBookInfiniteQuery from '@/queries/my-book/useMyBookInfiniteQuery';

export default function useMyBookListHook() {
  const { order, status } = useMyBookParams();
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useMyBookInfiniteQuery({ order, status });
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);
  useErrorHandler(isError, error);

  return {
    ref,
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  };
}
