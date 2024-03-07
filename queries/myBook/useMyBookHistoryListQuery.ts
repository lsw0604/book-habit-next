import { useQuery } from '@tanstack/react-query';
import { queriesKey } from '..';

const { useMyBookHistoryListQueryKey } = queriesKey.myBook;

export default function useMyBookHistoryListQuery(users_books_id: number) {
  const {} = useQuery([
    useMyBookHistoryListQueryKey,
    users_books_id.toString(),
  ]);
}
