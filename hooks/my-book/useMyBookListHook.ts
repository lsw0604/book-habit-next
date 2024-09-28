import useMyBookParams from '@/hooks/my-book/useMyBookParams';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useInfiniteScroll from '@/hooks/infinite-scroll/useInfiniteScroll';
import useInfiniteMyBook from '@/queries/my-book/useInfiniteMyBook';

export default function useMyBookListHook() {
  const { order, status } = useMyBookParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteMyBook({ order, status });
  const ref = useInfiniteScroll(fetchNextPage, hasNextPage);
  useErrorHandler(isError, error);

  return {
    ref,
    data,
    isLoading,
    isFetching,
    isError,
    error,
  };
}
