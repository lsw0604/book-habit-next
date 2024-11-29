import dayjs from 'dayjs';

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

  return (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 transition-colors flex justify-between items-center">
      <div className="flex w-full flex-col mb-2 gap-2">
        <div className="text-base text-gray-500 ml-auto">{page}Page</div>
        <div className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 w-full">
          {memo ? memo : '등록된 메모가 없습니다.'}
        </div>
        <div className="flex gap-2">
          <button className="text-sm text-blue-500 hover:text-blue-700">
            수정
          </button>
          <button className="text-sm text-red-500 hover:text-red-700">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
