type DateBoxType<T> = {
  day: string;
  obj: Record<string, T>;
};

type CalendarType = {
  startDate: string;
  firstDOW: number;
  lastDate: number;
  monthName: string;
  month: string;
  year: string;
};
