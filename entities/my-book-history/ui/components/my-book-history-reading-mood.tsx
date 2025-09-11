import { SmileIcon } from 'lucide-react';

import { cn } from '@/shared/utils';

import { parseMoodLabel } from '../../lib';
import type { MyBookHistory } from '../../model';

type MyBookHistoryReadingMoodType = Pick<MyBookHistory, 'readingMood'>;

interface MyBookHistoryReadingMoodProps {
  history: MyBookHistoryReadingMoodType;
  className?: string;
}

export function MyBookHistoryReadingMood({
  history,
  className,
}: MyBookHistoryReadingMoodProps) {
  const { emoji, label } = parseMoodLabel(history.readingMood);
  return (
    <div className={cn('bg-transparent border rounded-lg p-3', className)}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <SmileIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-foreground">독서 감정</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div className="w-full">
          <div className="text-xs text-muted-foreground">
            오늘의 독서는 어떠셨나요?
          </div>
          <div className="font-bold text-muted-foreground">{label}</div>
        </div>
      </div>
    </div>
  );
}
