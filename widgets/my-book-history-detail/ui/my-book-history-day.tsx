import { isSameDay } from 'date-fns';
import { useContext } from 'react';

import { MyBookHistory } from '@/entities/my-book-history/model';
import { CalendarContext } from '@/shared/ui/activity-calendar/model';
import { DayComponentProps } from '@/shared/ui/activity-calendar/model/types';
import { cn } from '@/shared/utils/class-name';

const getPagesReadTier = (pages: number) => {
  if (pages === 0) return 0;
  if (pages > 0 && pages <= 10) return 1;
  if (pages > 10 && pages <= 30) return 2;
  if (pages > 30 && pages <= 50) return 3;
  if (pages > 50) return 4;
  return 0;
};

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

export default function MyBookHistoryDay({
  data,
  date,
}: DayComponentProps<MyBookHistory>) {
  const { selectedDate } = useContext(CalendarContext);

  const pagesRead = data
    ? data.reduce(
        (total, history) => total + (history.endPage - history.startPage),
        0
      )
    : 0;

  const tier = getPagesReadTier(pagesRead);

  if (!data || data.length === 0) {
    return null;
  }

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
