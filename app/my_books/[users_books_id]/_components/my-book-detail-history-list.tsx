import MyBookDetailHistoryItem from './my-book-detail-history-item';

interface MyBookDetailHistoryListProps {
  users_books_id: number;
  history: Record<string, MyBookPageQueriesHistoryListType>;
}

export default function MyBookDetailHistoryList({
  users_books_id,
  history,
}: MyBookDetailHistoryListProps) {
  let arr: MyBookPageQueriesHistoryListType = [];

  for (let date in history) {
    arr = arr.concat(history[date]);
  }

  if (arr.length === 0) return <MyBookDetailHistoryList.Empty />;

  return (
    <div className="w-full h-auto flex p-4">
      <ul className="w-full h-auto p-4 shadow-lg rounded-lg">
        {arr.map((data) => (
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

MyBookDetailHistoryList.Empty = () => {
  return (
    <div className="w-full h-auto flex p-4">
      <div className="w-full h-auto p-4 shadow-lg rounded-lg">
        <span className="w-full text-lg text-center">
          아직 등록된 독서기록이 없습니다.
        </span>
      </div>
    </div>
  );
};
