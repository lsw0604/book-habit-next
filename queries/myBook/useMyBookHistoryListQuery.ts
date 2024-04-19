import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { myBookHistoryAPI } from '@/lib/api/myBook';
import { queriesKey } from 'queries';

const { useMyBookHistoryListQueryKey } = queriesKey.myBook;

export default function useMyBookHistoryListQuery(users_books_id: number) {
  const { data } = useQuery<
    MyBookPageQueriesHistoryListResponseType,
    AxiosError,
    Omit<MyBookPageQueriesHistoryListResponseType, 'books'> & {
      books: MyBookPageQueriesHistoryListType;
    }
  >(
    [useMyBookHistoryListQueryKey, users_books_id.toString()],
    () => myBookHistoryAPI(users_books_id),
    {
      select: (response) => {
        const { books } = response;
        let historyList: MyBookPageQueriesHistoryListType = [];

        for (let history in books) {
          historyList = historyList.concat(books[history]);
        }

        return { ...response, books: historyList };
      },
    }
  );

  return {
    data,
  };
}
