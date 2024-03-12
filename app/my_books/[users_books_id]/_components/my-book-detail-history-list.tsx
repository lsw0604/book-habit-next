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
    <div className="w-full h-40 p-4 flex flex-col shadow-lg rounded-lg">
      <ul className="w-full h-auto overflow-scroll">
        {historyList.map((data) => (
          <MyBookDetailHistoryItem
            key={data.id}
            data={data}
            myBookId={users_books_id}
            calendarHandler={calendarHandler}
          />
        ))}
      </ul>
    </div>
  );
}
