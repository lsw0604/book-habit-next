import dayjs from 'dayjs';
import { BookOpenIcon, CalendarIcon, ScrollTextIcon } from 'lucide-react';

interface MyBookHistoryItemProps extends MyBookHistoryItemType {}

export default function MyBookHistoryItem({
  id,
  myBookId,
  page,
  date,
  memo,
  createdAt,
  updatedAt,
}: MyBookHistoryItemProps) {
  const formattedDate = dayjs(date).format('YYYY.MM.DD');
  const updatedDate =
    createdAt === updatedAt ? `생성됨 : ${createdAt}` : `수정됨 : ${updatedAt}`;

  const onClick = () => {
    console.log(id);
  };

  return (
    <div className="border-2 rounded-lg p-4" onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        <span className="text-xs text-gray-400">{updatedDate}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <BookOpenIcon className="w-4 h-4" />
        <span>{page} 페이지</span>
      </div>
      <div className="flex gap-2">
        <ScrollTextIcon className="w-4 h-4 text-gray-600 flex-shrink-0 mt-1" />
        <p className="text-gray-700">
          {memo && memo?.length > 0 ? memo : null}
        </p>
      </div>
    </div>
  );
}
