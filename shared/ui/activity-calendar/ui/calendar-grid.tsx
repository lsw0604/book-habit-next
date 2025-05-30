import { useMemo } from 'react';
import { CalendarGridProps } from '../model/types';
import { CalendarDay } from './calendar-day';
import dayjs from 'dayjs';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const CalendarGrid = <T,>({
  daysInMonth,
  firstDayOfWeek,
  data,
  DayComponent = CalendarDay,
  onDateClick,
}: CalendarGridProps<T>) => {
  const calendarDays = useMemo(() => {
    const today = dayjs().format('YYYY-MM-DD');

    return daysInMonth.map(date => {
      const formattedDate = dayjs(date).format('YYYY-MM-DD');
      const dayData = data?.[formattedDate];
      const isToday = formattedDate === today;

      return {
        date,
        formattedDate,
        data: dayData,
        isToday,
        key: formattedDate,
      };
    });
  }, [daysInMonth, data]);

  return (
    <div className="grid grid-cols-7 gap-0 mt-1">
      {/* 요일 헤더 */}
      {WEEKDAYS.map(day => (
        <div
          key={day}
          className="p-2 text-center text-xs font-medium text-gray-600 bg-gray-50"
        >
          {day}
        </div>
      ))}

      {/* 빈 셀 (첫 주의 빈 공간) */}
      {Array.from({ length: firstDayOfWeek }, (_, index) => (
        <div key={`empty-${index}`} className="p-2 min-h-[40px]" />
      ))}

      {/* 실제 날짜들 */}
      {calendarDays.map(({ date, data: dayData, isToday, key }) => (
        <DayComponent
          key={key}
          date={date}
          data={dayData}
          isToday={isToday}
          isCurrentMonth={true}
        />
      ))}
    </div>
  );
};
