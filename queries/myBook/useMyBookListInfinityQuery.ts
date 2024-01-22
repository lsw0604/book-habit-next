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
  } = useInfiniteQuery<
    MyBookListInfinityQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >(
    [useMyBookListInfinityQueryKey, status],
    ({ pageParam = 1 }) => myBookListAPI(pageParam, status),
    {
      getNextPageParam: (response) => response.nextPage,
      staleTime: 5 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );

  return {
    data,
    error,
    refetch,
    isError,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
}
