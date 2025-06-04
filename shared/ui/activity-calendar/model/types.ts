export interface CalendarData<T> {
  readonly [dateKey: string]: readonly T[];
}

export interface CalendarDayProps<T> {
  readonly date: Date;
  readonly data?: readonly T[];
  readonly isToday?: boolean;
  readonly onDateClick?: (date: Date, data?: readonly T[]) => void;
  readonly DayComponent?: React.ComponentType<DayComponentProps<T>>;
}

export interface DayComponentProps<T> {
  readonly date: Date;
  readonly data?: readonly T[];
}

export interface CalendarProps<T> {
  readonly data?: CalendarData<T>;
  readonly DayComponent?: React.ComponentType<DayComponentProps<T>>;
  readonly initialDate?: string | Date;
  readonly className?: string;
  readonly onDateClick?: (date: Date, data?: readonly T[]) => void;
}

export interface CalendarGridProps<T> {
  readonly daysInMonth: readonly Date[];
  readonly firstDayOfWeek: number;
  readonly data?: CalendarData<T>;
  readonly DayComponent?: React.ComponentType<DayComponentProps<T>>;
  readonly onDateClick?: (date: Date, data?: readonly T[]) => void;
}

export interface CalendarHeaderProps {
  readonly year: number;
  readonly month: number;
  readonly onNavigateMonth: (direction: 'prev' | 'next') => void;
  readonly onNavigateToToday: () => void;
}
