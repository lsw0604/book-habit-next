import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { myBookHistoryAPI } from '@/lib/api/myBook';
import { queriesKey } from 'queries';

const { useMyBookHistoryListQueryKey } = queriesKey.myBook;

export default function useMyBookHistoryListQuery(users_books_id: number) {
  const { data } = useQuery<
    MyBookHistoryListResponseType,
    AxiosError<{ message: string; status: StatusType }>
  >([useMyBookHistoryListQueryKey, users_books_id.toString()], () =>
    myBookHistoryAPI(users_books_id)
  );

  return {
    data,
  };
}
