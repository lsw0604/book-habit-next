'use client';

import { cn } from '@/shared/utils/class-name';

import { CalendarProps } from '../types';

import { ActivityCalendarGrid } from './activity-calendar-grid';
import { ActivityCalendarHeader } from './activity-calendar-header';
import { ActivityCalendarProvider } from './activity-calendar-provider';

export function ActivityCalendar<T>(props: CalendarProps<T>) {
  const { className } = props;

  return (
    <ActivityCalendarProvider {...props}>
      <div
        className={cn(
          'bg-white rounded-lg shadow-sm border px-2 py-4',
          className
        )}
      >
        <ActivityCalendarHeader />
        <ActivityCalendarGrid />
      </div>
    </ActivityCalendarProvider>
  );
}
