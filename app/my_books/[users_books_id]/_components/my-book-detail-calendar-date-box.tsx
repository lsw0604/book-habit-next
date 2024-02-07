import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/app/store';
import modal, { modalActions } from '@/app/store/modal';
import { myBookActions } from '@/app/store/myBook';

interface MyBookDetailCalendarDateBoxProps {
  colStart?: number;
  date: number;
  year: string;
  month: string;
  obj: Record<string, MyBookPageQueriesHistoryListType>;
  startDate?: string;
  endDate?: string;
}

const STATUS_COLOR_OBJECT: Record<HistoryStatusType, string> = {
  읽는중: 'bg-rose-300',
  다읽음: 'bg-purple-300',
  읽기시작함: 'bg-yellow-300',
  읽고싶음: 'bg-orange-300',
};

const COL_START_OBJ: {
  [key: number]: string;
} = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
};

export default function MyBookDetailCalendarDateBox({
  colStart,
  date,
  year,
  month,
  obj,
  endDate,
  startDate,
}: MyBookDetailCalendarDateBoxProps) {
  const dispatch = useAppDispatch();

  const yearInt = parseInt(year);
  const monthInt = parseInt(month) - 1;

  const dayObj = dayjs().locale('ko').year(yearInt).month(monthInt).date(date);

  const isSaturday = dayObj.day() === 6;
  const isSunday = dayObj.day() === 0;

  const dateMapped = obj[dayObj.format('YYYY-MM-DD')];

  const startDateDayjs = startDate ? dayjs(startDate) : undefined;
  const endDateDayjs = endDate ? dayjs(endDate) : dayjs().add(-1, 'day');

  const isX =
    (startDateDayjs && dayObj.isBefore(startDateDayjs)) ||
    (endDateDayjs && dayObj.isAfter(endDateDayjs.add(1, 'day')));

  const historyRegisterModalHandler = () => {
    if (!isX) {
      dispatch(modalActions.setModalState({ type: 'registerHistory' }));
      dispatch(myBookActions.setMyBookDate(dayObj.format('YYYY-MM-DD')));
    }
  };

  return (
    <div
      className={cn(
        colStart && COL_START_OBJ[colStart],
        'relative cursor-pointer flex justify-center items-center flex-col',
        isX && 'bg-[rgba(0,0,0,0.05)]'
      )}
      onClick={historyRegisterModalHandler}
    >
      <div
        className={cn(
          'h-4 w-full text-xs pl-2',
          isSaturday && 'text-blue-300',
          isSunday && 'text-rose-300'
        )}
      >
        {date}
      </div>
      <div className="h-8 w-full text-xs flex flex-col-reverse">
        {dateMapped?.map((v) => (
          <div
            className={cn(
              'bg-rose-300 h-4 w-full rounded-full mb-0.5 text-xs truncate px-1',
              `${STATUS_COLOR_OBJECT[v.status]}`
            )}
            key={v4()}
          >
            {v.status}
          </div>
        ))}
      </div>
    </div>
  );
}
