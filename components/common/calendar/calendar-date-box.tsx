import { cn } from '@/utils/class-name';
import dayjs from 'dayjs';
import { ReactNode } from 'react';

interface CalendarDateBoxProps {
  date: Date;
  index: number;
  firstDow: number;
  children?: ReactNode;
}

const COL_START_OBJ: Record<number, string> = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
};

export default function CalendarDateBox({
  index,
  date,
  children,
  firstDow,
}: CalendarDateBoxProps) {
  const today = dayjs().format('YYYY-MM-DD');

  const isToday = dayjs(date).format('YYYY-MM-DD') === today;
  const isSunday = dayjs(date).day() === 0;
  const isSaturday = dayjs(date).day() === 6;
  const day = dayjs(date).format('D');

  return (
    <div
      className={cn(
        index + 1 === 1 ? COL_START_OBJ[firstDow + 1] : undefined,
        'relative w-full pt-full cursor-pointer hover:bg-gray-200',
        isToday && 'bg-blue-200',
        (isSunday || isSaturday) && 'bg-gray-200'
      )}
    >
      <div
        className={cn(
          'absolute top-0 left-0 m-1 z-10',
          isToday ? 'text-blue-900' : '',
          isSunday ? 'text-rose-300' : '',
          isSaturday ? 'text-blue-300' : ''
        )}
      >
        {day}
      </div>
      {children}
    </div>
  );
}
