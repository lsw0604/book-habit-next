import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import useToastHook from '@/hooks/useToastHook';
import { myBookInfoAPI } from '@/lib/api/myBook';
import { queriesKey } from 'queries';

const { useMyBookDetailInfoQueryKey } = queriesKey.myBook;

const ERROR_MESSAGE: { message: string; status: StatusType } = {
  message: '책 정보를 불러오는데 실패했습니다.',
  status: 'error',
};

export default function useMyBookDetailInfoQuery(users_books_id: number) {
  const { addToast } = useToastHook();

  const { data, isLoading, isError, error } = useQuery<
    MyBookDetailInfoQueryResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >(
    [useMyBookDetailInfoQueryKey, users_books_id.toString()],
    () => myBookInfoAPI(users_books_id),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  useEffect(() => {
    if (isError && error && error.response) {
      addToast({ ...ERROR_MESSAGE });
    }
  }, [isError, error]);

  return {
    data,
    isLoading,
  };
}
