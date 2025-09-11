import { CalendarIcon } from 'lucide-react';

import { cn, formatDate } from '@/shared/utils';

import type { MyBookHistory, SerializedMyBookHistory } from '../../model';

type MyBookHistoryReadDateType =
  | Pick<MyBookHistory, 'date'>
  | Pick<SerializedMyBookHistory, 'date'>;

interface MyBookHistoryReadDateProps {
  history: MyBookHistoryReadDateType;
  className?: string;
}

export function MyBookHistoryReadDate({
  history,
  className,
}: MyBookHistoryReadDateProps) {
  const formattedDate = formatDate(history.date, 'long');

  return (
    <div className={cn('bg-transparent border rounded-lg p-3', className)}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-foreground">읽은 날짜</span>
      </div>
      <div className="text-sm text-muted-foreground mt-0.5">
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
