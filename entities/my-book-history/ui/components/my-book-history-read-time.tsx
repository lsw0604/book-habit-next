import { Clock1Icon } from 'lucide-react';
import { Fragment } from 'react';

import { cn, formatDate, formatMinutesToParts } from '@/shared/utils';

import { MyBookHistory, SerializedMyBookHistory } from '../../model';

type MyBookHistoryReadTimePick = 'readingMinutes' | 'startTime' | 'endTime';

type MyBookHistoryReadTimeType =
  | Pick<MyBookHistory, MyBookHistoryReadTimePick>
  | Pick<SerializedMyBookHistory, MyBookHistoryReadTimePick>;

interface MyBookHistoryReadTimeProps {
  history: MyBookHistoryReadTimeType;
  className?: string;
}

export function MyBookHistoryReadTime({
  history,
  className,
}: MyBookHistoryReadTimeProps) {
  const formattedStartTime = formatDate(history.startTime, 'time');
  const formattedEndTime = formatDate(history.endTime, 'time');
  const durationParts = formatMinutesToParts(history.readingMinutes);

  return (
    <div className={cn('bg-transparent border rounded-lg p-3', className)}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <Clock1Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-foreground">독서 시간</span>
      </div>
      <div className="flex flex-col">
        <div className="flex items-baseline">
          {durationParts.map((part, index) => (
            <Fragment key={`${part.value}-${part.unit}`}>
              {index > 0 && <span className="w-1.5" />}
              <span className="text-2xl font-bold text-foreground">
                {part.value}
              </span>
              <span className="text-lg font-normal">{part.unit}</span>
            </Fragment>
          ))}
        </div>
        <span className="text-xs text-muted-foreground mt-0.5">
          {formattedStartTime} ~ {formattedEndTime}
        </span>
      </div>
    </div>
  );
}
