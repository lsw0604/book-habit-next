type DateBoxType<T> = {
  year: number;
  month: number;
  date: number;
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
