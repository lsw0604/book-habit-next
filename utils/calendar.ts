import dayjs from 'dayjs';

export function getUpdatedCalendar(
  monthYear: CalendarDetailType,
  monthIncrement: number
): string {
  return dayjs(monthYear.startDate).add(monthIncrement, 'months').format();
}

export function getCalendarDetail(initialDate: string): CalendarDetailType {
  const month = dayjs(initialDate).format('MM');
  const year = dayjs(initialDate).format('YYYY');

  const startDate = dayjs(`${year}${month}01`).format();
  const firstDOW = Number(dayjs(startDate).format('d'));
  const lastDate = Number(dayjs(startDate).endOf('month').format('DD'));

  return { startDate, firstDOW, lastDate, month, year };
}

export function getNewCalendar(
  prevData: CalendarDetailType,
  monthIncrement: number
): CalendarDetailType {
  const newMonthYear = getUpdatedCalendar(prevData, monthIncrement);

  return getCalendarDetail(newMonthYear);
}
