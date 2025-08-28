import { ComponentType } from 'react';

import { DayComponentProps } from './day-component.type';

export interface CalendarDayProps<T> {
  readonly date: Date;
  readonly data?: readonly T[];
  readonly isToday?: boolean;
  readonly DayComponent?: ComponentType<DayComponentProps<T>>;
}
