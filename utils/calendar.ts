import { CalendarType } from '@/types/redux.calendar';
import dayjs from 'dayjs';

export function getUpdatedCalendar(
  monthYear: CalendarType,
  monthIncrement: number
): dayjs.Dayjs {
  return monthYear.startDate.clone().add(monthIncrement, 'months');
}

export function getCalendarDetail(initialDate: dayjs.Dayjs): CalendarType {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = dayjs(`${year}${month}01`).add(9, 'hour');
  const firstDOW = Number(startDate.format('d'));
  const lastDate = Number(startDate.clone().endOf('month').format('DD'));
  const monthName = startDate.format('MMMM');
  return { startDate, firstDOW, lastDate, monthName, month, year };
}

export function getNewCalendar(
  prevData: CalendarType,
  monthIncrement: number
): CalendarType {
  const newMonthYear = getUpdatedCalendar(prevData, monthIncrement);

  return getCalendarDetail(newMonthYear);
}
