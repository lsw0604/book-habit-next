import dayjs from 'dayjs';

import MyBookDetailHistoryItemXButton from './my-book-detail-history-item-x-button';

import { cn } from '@/lib/utils/cn';

interface MyBookDetailHistoryItemProps {
  data: MyBookHistoryItemType;
  myBookId: number;
}

const STATUS_COLOR_OBJECT: Record<HistoryStatusType, string> = {
  읽는중: 'bg-rose-300',
  다읽음: 'bg-purple-300',
  읽기시작함: 'bg-yellow-300',
  읽고싶음: 'bg-orange-300',
};

export default function MyBookDetailHistoryItem({
  data,
  myBookId,
}: MyBookDetailHistoryItemProps) {
  const { created_at, date, id, page, status, updated_at } = data;

  const timeStamp = updated_at
    ? `${dayjs(updated_at)
        .add(9, 'hour')
        .format('YYYY년MM월DD일 HH시mm분ss초')} 수정`
    : `${dayjs(created_at)
        .add(9, 'hour')
        .format('YYYY년MM월DD일 HH시mm분ss초')} 등록`;

  const timeLine = dayjs(date).add(9, 'hour').format('YYYY년MM월DD일');

  return (
    <li className="h-auto w-full">
      <h1 className="font-bold">{timeLine}</h1>
      <section className="w-full h-auto flex flex-row">
        <div className={cn('w-2 h-auto mr-2', STATUS_COLOR_OBJECT[status])} />
        <div className="w-full flex h-12 items-start flex-col justify-center">
          <p className="text-xs">
            <span
              className={cn(
                'px-2 rounded-sm mr-2',
                STATUS_COLOR_OBJECT[status]
              )}
            >
              {status}
            </span>
            {page && <span className="">{page}쪽 읽음</span>}
          </p>
          <div className="text-xs text-gray-400 flex flex-col justify-center">
            {timeStamp}
          </div>
        </div>
        <MyBookDetailHistoryItemXButton historyId={id} myBookId={myBookId} />
      </section>
    </li>
  );
}
