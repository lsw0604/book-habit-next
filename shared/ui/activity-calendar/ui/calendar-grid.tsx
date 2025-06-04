import { useMemo } from 'react';
import { CalendarGridProps } from '../model/types';
import { CalendarDay } from './calendar-day';
import { format } from 'date-fns';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const CalendarGrid = <T,>({
  daysInMonth,
  firstDayOfWeek,
  data,
  DayComponent,
  onDateClick,
}: CalendarGridProps<T>) => {
  const calendarDays = useMemo(() => {
    const todayFormattedString = format(new Date(), 'yyyy-MM-dd');

    return daysInMonth.map(dateObject => {
      const formattedDateString = format(dateObject, 'yyyy-MM-dd');
      const dayData = data?.[formattedDateString];
      const isToday = formattedDateString === todayFormattedString;

      return {
        date: dateObject,
        formattedDate: formattedDateString,
        data: dayData,
        isToday,
        key: formattedDateString,
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
        <div key={`empty-${index}`} className="p-1 aspect-square" />
      ))}

      {/* 실제 날짜들 */}
      {calendarDays.map(({ date, data: dayData, isToday, key }) => (
        <CalendarDay
          key={key}
          date={date}
          data={dayData}
          isToday={isToday}
          DayComponent={DayComponent}
          onDateClick={onDateClick}
        />
      ))}
    </div>
  );
};
