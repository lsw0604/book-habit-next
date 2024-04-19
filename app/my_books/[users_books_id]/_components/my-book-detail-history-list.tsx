import MyBookDetailHistoryItem from './my-book-detail-history-item';

interface MyBookDetailHistoryListProps {
  users_books_id: number;
  history: MyBookPageQueriesHistoryListType;
}

export default function MyBookDetailHistoryList({
  users_books_id,
  history,
}: MyBookDetailHistoryListProps) {
  return (
    <div className="w-full h-auto flex p-4">
      <ul className="w-full h-auto p-4 shadow-lg rounded-lg">
        {history.map((data) => (
          <MyBookDetailHistoryItem
            key={data.id}
            data={data}
            myBookId={users_books_id}
          />
        ))}
      </ul>
    </div>
  );
}
