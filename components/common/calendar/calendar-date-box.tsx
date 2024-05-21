import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { ComponentType } from 'react';

interface CalendarDateBoxProps<T> {
  colStart?: number;
  date: number;
  year: number;
  month: number;
  startDate?: Date;
  endDate?: Date;
  obj?: Record<string, T>;
  component?: ComponentType<DateBoxType<T | undefined>>;
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

export default function CalendarDateBox<T>({
  colStart,
  date,
  month,
  year,
  startDate,
  endDate,
  obj,
  component: Component,
}: CalendarDateBoxProps<T>) {
  const dayObj = dayjs(`${year}-${month}-${date}`).locale('ko');
  const day = dayObj.format('YYYY-MM-DD');

  const isSaturday = dayObj.day() === 6;
  const isSunday = dayObj.day() === 0;

  const startDateDayjs = startDate
    ? dayjs(startDate).add(9, 'hour')
    : undefined;
  const endDateDayjs = endDate
    ? dayjs(endDate).add(9, 'hour')
    : dayjs().add(-1, 'day');

  const isX =
    (startDateDayjs && dayObj.isBefore(startDateDayjs.add(-1, 'day'))) ||
    (endDateDayjs && dayObj.isAfter(endDateDayjs.add(1, 'day')));

  return (
    <div
      className={cn(
        colStart && COL_START_OBJ[colStart],
        'relative cursor-pointer flex justify-center items-center flex-col h-auto',
        isX && 'bg-[rgba(0,0,0,0.05)]'
      )}
    >
      <div
        className={cn(
          'min-h-4 h-full w-full text-xs pl-2',
          isSaturday && 'text-blue-300',
          isSunday && 'text-rose-300'
        )}
      >
        {date}
      </div>
      <div className="min-h-8 h-auto w-full text-xs flex flex-col-reverse">
        {Component && obj && <Component obj={obj} day={day} />}
      </div>
    </div>
  );
}
