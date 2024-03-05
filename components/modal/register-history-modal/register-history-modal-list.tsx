import { useQuery } from '@tanstack/react-query';
import RegisterHistoryModalItem from './register-history-modal-item';
import { queriesKey } from '@/queries';
import { myBookHistoryAPI } from '@/lib/api/myBook';
import { RootState, useAppSelector } from '@/app/store';

interface RegisterHistoryModalListProps {
  myBookId: number;
}

const { history } = queriesKey.myBook.useMyBookPageQueriesKey;

export default function RegisterHistoryModalList({
  myBookId,
}: RegisterHistoryModalListProps) {
  const { date } = useAppSelector((state: RootState) => state.myBook);

  const { data } = useQuery(
    [history, myBookId.toString()],
    () => myBookHistoryAPI(myBookId),
    {
      select: (response) => {
        return response.books[date as string];
      },
      suspense: true,
    }
  );

  return (
    <ul className="w-full">
      {data?.map((item) => (
        <RegisterHistoryModalItem
          key={item.id}
          data={item}
          myBookId={myBookId}
        />
      ))}
    </ul>
  );
}
