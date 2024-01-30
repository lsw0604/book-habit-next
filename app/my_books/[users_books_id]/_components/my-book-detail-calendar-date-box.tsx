import dayjs from 'dayjs';

import { cn } from '@/lib/utils';
import { COL_START_OBJ, STATUS_COLOR_OBJECT } from '@/utils/staticData';
import { v4 } from 'uuid';
import { XIcon } from 'lucide-react';

interface MyBookDetailCalendarDateBoxProps {
  colStart?: number;
  date: number;
  year: string;
  month: string;
  obj: { [date: string]: HistoryStatusType[] };
  startDate?: string;
  endDate?: string;
}

export default function MyBookDetailCalendarDateBox({
  colStart,
  date,
  year,
  month,
  obj,
  endDate,
  startDate,
}: MyBookDetailCalendarDateBoxProps) {
  const dayObj = dayjs()
    .locale('ko')
    .year(parseInt(year))
    .month(parseInt(month) - 1)
    .date(date);

  const isSaturday = dayObj.day() === 6;
  const isSunday = dayObj.day() === 0;
  const dateMapped = obj[dayObj.format('YYYY-MM-DD')];
  const isX =
    (startDate && dayObj.isBefore(startDate)) ||
    (endDate && dayObj.isAfter(endDate));

  return (
    <div
      className={cn(
        colStart && COL_START_OBJ[colStart],
        'relative cursor-pointer flex justify-center items-center flex-col'
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
      {isX ? (
        <div className="h-8 w-full text-xs flex flex-col-reverse">
          <XIcon className="opacity-40 w-4 h-4" />
        </div>
      ) : (
        <div className="h-8 w-full text-xs flex flex-col-reverse">
          {dateMapped?.map((v) => (
            <div
              className={cn(
                'bg-rose-300 h-4 w-4 rounded-full mb-0.5',
                `${STATUS_COLOR_OBJECT[v]}`
              )}
              key={v4()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
