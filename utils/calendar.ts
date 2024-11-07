import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns';
import dayjs from 'dayjs';

export function getUpdatedCalendar(
  monthYear: CalendarDetailType,
  monthIncrement: number
): string {
  return monthYear.date.add(monthIncrement, 'months').format();
}

export function getCalendarDetail(initialDate: string): CalendarDetailType {
  const year = dayjs(initialDate).format('YYYY');
  const month = dayjs(initialDate).format('MM');

  const date = dayjs(`${year}${month}01`);

  const start = startOfMonth(date.toDate());
  const end = endOfMonth(date.toDate());
  const dayArr = eachDayOfInterval({ start, end });

  const firstDOW = Number(dayjs(start).format('d'));

  return { year, month, date, dayArr, firstDOW };
}

export function getNewCalendar(
  prevData: CalendarDetailType,
  monthIncrement: number
): CalendarDetailType {
  const newMonthYear = getUpdatedCalendar(prevData, monthIncrement);

  return getCalendarDetail(newMonthYear);
}
