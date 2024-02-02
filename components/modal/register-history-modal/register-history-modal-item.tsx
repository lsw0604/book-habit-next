import dayjs from 'dayjs';

interface RegisterHistoryModalProps {
  data: MyBookPageQueriesHistoryItemType;
}

export default function RegisterHistoryModalItem({
  data,
}: RegisterHistoryModalProps) {
  const { created_at, date, id, page, status, updated_at } = data;

  const timeStamp = updated_at
    ? `수정됨 ${dayjs(updated_at)
        .add(9, 'hour')
        .format('YYYY년MM월DD일 HH:mm:ss')}`
    : dayjs(created_at).add(9, 'hour').format('YYYY년MM월DD일 HH:mm:ss');

  const timeLine = dayjs(date).add(9, 'hour').format('YYYY/MM/DD');

  return (
    <li className="flex gap-2 w-full justify-between items-center">
      <p className="flex flex-col">{timeLine}</p>
      <span>{status}</span>
      {page && <span>{page}읽음</span>}
      <span className="text-xs">{timeStamp}</span>
    </li>
  );
}
