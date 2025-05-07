import { Button } from '@/shared/ui/button';
import { getCalendarDetail, getNewCalendar } from '@/utils/calendar';
import dayjs from 'dayjs';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface CalendarHeaderProps {
  calendar: CalendarDetailType;
  setCalendar: Dispatch<SetStateAction<CalendarDetailType>>;
}

export default function CalendarHeader({
  calendar,
  setCalendar,
}: CalendarHeaderProps) {
  const calendarHandler = (month: number) =>
    setCalendar(prev => getNewCalendar(prev, month));

  return (
    <div className="w-full h-auto flex justify-between p-2">
      <Button variant="ghost" type="button" onClick={() => calendarHandler(-1)}>
        <ArrowLeftIcon className="w-4 h-4" />
      </Button>
      <span className="text-lg font-bold">
        {calendar.year}년 {calendar.month}월
      </span>
      <Button variant="ghost" type="button" onClick={() => calendarHandler(1)}>
        <ArrowRightIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        onClick={() =>
          setCalendar(getCalendarDetail(dayjs().format('YYYY-MM-DD')))
        }
      >
        Today
      </Button>
    </div>
  );
}
