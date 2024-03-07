import MyBookDetailHistoryItem from './my-book-detail-history-item';

interface MyBookDetailHistoryListProps {
  users_books_id: number;
  books: Record<string, MyBookPageQueriesHistoryListType>;
}

export default function MyBookDetailHistoryList({
  users_books_id,
  books,
}: MyBookDetailHistoryListProps) {
  let data: MyBookPageQueriesHistoryListType = [];

  for (let book in books) {
    data = data.concat(books[book]);
  }

  return (
    <div className="w-full h-40 p-4 flex flex-col shadow-lg rounded-lg">
      <ul className="w-full h-auto overflow-scroll">
        {data.map((v) => (
          <MyBookDetailHistoryItem data={v} myBookId={users_books_id} />
        ))}
      </ul>
    </div>
  );
}
