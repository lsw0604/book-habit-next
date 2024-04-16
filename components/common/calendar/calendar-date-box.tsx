import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { v4 } from 'uuid';

interface CalendarDateBoxProps {
  colStart?: number;
  date: number;
  year: string;
  month: string;
  startDate?: Date;
  endDate?: Date;
  children?: ReactNode;
}

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

export default function CalendarDateBox({
  colStart,
  date,
  month,
  year,
  startDate,
  endDate,
  children,
}: CalendarDateBoxProps) {
  const yearInt = parseInt(year);
  const monthInt = parseInt(month) - 1;

  const dayObj = dayjs().locale('ko').year(yearInt).month(monthInt).date(date);

  const isSaturday = dayObj.day() === 6;
  const isSunday = dayObj.day() === 0;

  const startDateDayjs = startDate
    ? dayjs(startDate).add(9, 'hour')
    : undefined;
  const endDateDayjs = endDate
    ? dayjs(endDate).add(9, 'hour')
    : dayjs().add(-1, 'day');

  const isX =
    (startDateDayjs && dayObj.isBefore(startDateDayjs)) ||
    (endDateDayjs && dayObj.isAfter(endDateDayjs.add(1, 'day')));

  return (
    <div
      className={cn(
        colStart && COL_START_OBJ[colStart],
        'relative cursor-pointer flex justify-center items-center flex-col',
        isX && 'bg-[rgba(0,0,0,0.05)]'
      )}
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
      <div className="h-8 w-full text-xs flex flex-col-reverse">{children}</div>
    </div>
  );
}
