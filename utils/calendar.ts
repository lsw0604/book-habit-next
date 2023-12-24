import { CalendarType } from '@/types/redux.calendar';
import dayjs from 'dayjs';

export function getUpdatedCalendar(
  monthYear: CalendarType,
  monthIncrement: number
): string {
  return dayjs(monthYear.startDate).add(monthIncrement, 'months').format();
}

export function getCalendarDetail(initialDate: string): CalendarType {
  const month = dayjs(initialDate).format('MM');
  const year = dayjs(initialDate).format('YYYY');
  const startDate = dayjs(`${year}${month}01`).format();
  const firstDOW = Number(dayjs(startDate).format('d'));
  const lastDate = Number(dayjs(startDate).endOf('month').format('DD'));
  const monthName = dayjs(startDate).format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function getNewCalendar(
  prevData: CalendarType,
  monthIncrement: number
): CalendarType {
  const newMonthYear = getUpdatedCalendar(prevData, monthIncrement);

  return getCalendarDetail(newMonthYear);
}
