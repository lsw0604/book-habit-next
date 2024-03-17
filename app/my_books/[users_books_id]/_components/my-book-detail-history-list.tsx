import MyBookDetailHistoryItem from './my-book-detail-history-item';

interface MyBookDetailHistoryListProps {
  users_books_id: number;
  books: Record<string, MyBookPageQueriesHistoryListType>;
  calendarHandler: (date: string) => void;
}

export default function MyBookDetailHistoryList({
  users_books_id,
  books,
  calendarHandler,
}: MyBookDetailHistoryListProps) {
  let historyList: MyBookPageQueriesHistoryListType = [];

  for (let book in books) {
    historyList = historyList.concat(books[book]);
  }

  return (
    <div className="w-full max-h-32 p-4 h-auto flex shadow-lg rounded-lg">
      <ul className="w-full h-auto overflow-scroll snap-mandatory">
        {/* {historyList.map((data) => (
          <MyBookDetailHistoryItem
            key={data.id}
            data={data}
            myBookId={users_books_id}
            calendarHandler={calendarHandler}
          />
        ))} */}

        <MyBookDetailHistoryItem
          key={1}
          data={{
            id: 264,
            status: '읽기시작함',
            date: '2022-10-17T15:00:00.000Z',
            page: null,
            created_at: '2023-10-27T07:28:51.000Z',
            updated_at: null,
          }}
          myBookId={users_books_id}
          calendarHandler={calendarHandler}
        />
        <MyBookDetailHistoryItem
          key={2}
          data={{
            id: 308,
            status: '다읽음',
            date: '2024-01-31T15:00:00.000Z',
            page: null,
            created_at: '2024-01-31T21:53:56.000Z',
            updated_at: null,
          }}
          myBookId={users_books_id}
          calendarHandler={calendarHandler}
        />
        <MyBookDetailHistoryItem
          key={3}
          data={{
            id: 308,
            status: '다읽음',
            date: '2024-01-31T15:00:00.000Z',
            page: null,
            created_at: '2024-01-31T21:53:56.000Z',
            updated_at: null,
          }}
          myBookId={users_books_id}
          calendarHandler={calendarHandler}
        />
        <MyBookDetailHistoryItem
          key={4}
          data={{
            id: 308,
            status: '다읽음',
            date: '2024-01-31T15:00:00.000Z',
            page: null,
            created_at: '2024-01-31T21:53:56.000Z',
            updated_at: null,
          }}
          myBookId={users_books_id}
          calendarHandler={calendarHandler}
        />
        <MyBookDetailHistoryItem
          key={5}
          data={{
            id: 308,
            status: '다읽음',
            date: '2024-01-31T15:00:00.000Z',
            page: null,
            created_at: '2024-01-31T21:53:56.000Z',
            updated_at: null,
          }}
          myBookId={users_books_id}
          calendarHandler={calendarHandler}
        />
      </ul>
    </div>
  );
}
