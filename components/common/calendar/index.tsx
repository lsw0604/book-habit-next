import { ReactNode } from 'react';
import dayjs from 'dayjs';
import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import { cn } from '@/utils/class-name';
import { COL_START_OBJ, DAY_OF_WEEK } from '@/constant/calendar';

const DayOfWeek = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-3 text-center before:box-border after:box-border">
      {children}
    </div>
  );
};

const CustomCalendar = () => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());
  const day = eachDayOfInterval({ start, end });
  const firstDow = Number(dayjs(start).format('d'));
  const today = dayjs().format('YYYY-MM-DD');

  return (
    <div className={cn('w-full grid grid-cols-7 gap-0 overflow-hidden')}>
      {DAY_OF_WEEK.map((day) => (
        <DayOfWeek key={day}>{day}</DayOfWeek>
      ))}
      {day.map((date, i) => {
        const formattedDate = dayjs(date).format('YYYY-MM-DD');
        const isToday = formattedDate === today;
        const isSunday = dayjs(date).day() === 0;
        const isSaturday = dayjs(date).day() === 6;

        return (
          <div
            key={formattedDate}
            className={cn(
              i + 1 === 1 ? COL_START_OBJ[firstDow + 1] : undefined,
              'relative w-full pt-full'
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
              {dayjs(date).format('D')}
            </div>
            <div
              className={cn(
                'h-full w-full absolute top-0 left-0',
                isToday ? 'bg-blue-200' : '',
                isSunday ? 'bg-gray-100' : '',
                isSaturday ? 'bg-gray-100' : '',
                'hover:bg-gray-200 cursor-pointer'
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CustomCalendar;
