import { isSameDay } from 'date-fns';

import {
  type DayComponentProps,
  useCalendarContext,
} from '@/shared/ui/activity-calendar';
import { cn } from '@/shared/utils/class-name';

import { calculatePagesTier } from '../lib';
import { MyBookHistory } from '../model';

function TierDot({ tier }: { tier: number }) {
  if (tier === 0) return null;

  const dotColors: { [key: number]: string } = {
    1: 'bg-green-400',
    2: 'bg-green-500',
    3: 'bg-green-600',
    4: 'bg-green-700',
  };

  return <div className={cn('w-2 h-2 rounded-full', dotColors[tier])} />;
}

export function MyBookHistoryDay({
  date,
  data,
}: DayComponentProps<MyBookHistory>) {
  const { selectedDate } = useCalendarContext();

  const pagesRead = data
    ? data.reduce(
        (total: number, history: MyBookHistory) =>
          total + (history.endPage - history.startPage),
        0
      )
    : 0;

  const tier = calculatePagesTier(pagesRead);

  if (!data || data.length === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-1">
      <span
        className={cn(
          'text-xs text-gray-500 dark:text-gray-400',
          isSameDay(selectedDate as Date, date) && 'text-primary-foreground'
        )}
      >
        {pagesRead}p
      </span>
      <TierDot tier={tier} />
    </div>
  );
}
