import RegisterHistoryModalItem from './register-history-modal-item';

interface RegisterHistoryModalListProps {
  data: MyBookPageQueriesHistoryItemType[];
}

export default function RegisterHistoryModalList({
  data,
}: RegisterHistoryModalListProps) {
  return (
    <ul className="w-full">
      {data.map((item) => (
        <RegisterHistoryModalItem key={item.id} data={item} />
      ))}
    </ul>
  );
}
