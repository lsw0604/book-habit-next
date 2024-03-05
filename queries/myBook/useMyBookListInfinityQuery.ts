import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { myBookListAPI } from 'lib/api/myBook';
import { queriesKey } from 'queries';

const { useMyBookListInfinityQueryKey } = queriesKey.myBook;

export default function useMyBookListInfinityQuery(status: SelectorBookType) {
  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
    refetch,
    isError,
    error,
    status: queryStatus,
  } = useInfiniteQuery<
    MyBookListInfinityQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >({
    queryKey: [useMyBookListInfinityQueryKey, status],
    queryFn: ({ pageParam = 1 }) => myBookListAPI(pageParam, status),
    getNextPageParam: (response) => response.nextPage,
  });

  return {
    data,
    error,
    refetch,
    isError,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    queryStatus,
  };
}
