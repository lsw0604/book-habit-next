import dayjs from 'dayjs';

type CalendarType = {
  startDate: string;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
};

type RootCalendarType = {
  calendar: CalendarType;
};
