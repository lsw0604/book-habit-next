import { cn } from '@/shared/utils';

import {
  generateReadingCommentary,
  generateReadingCommentaryColor,
} from '../../lib';
import type { MyBookHistory, SerializedMyBookHistory } from '../../model';

type MyBookHistoryCommentaryPick =
  | 'endPage'
  | 'endTime'
  | 'startPage'
  | 'startTime'
  | 'readingMood'
  | 'readingMinutes';

type MyBookHistoryCommentaryType =
  | Pick<MyBookHistory, MyBookHistoryCommentaryPick>
  | Pick<SerializedMyBookHistory, MyBookHistoryCommentaryPick>;

interface MyBookHistoryCommentaryProps {
  history: MyBookHistoryCommentaryType;
  className?: string;
}

export function MyBookHistoryCommentary({
  history,
  className,
}: MyBookHistoryCommentaryProps) {
  const { emoji, message } = generateReadingCommentary(history);
  const { bgColor, borderColor, textColor } =
    generateReadingCommentaryColor(history);

  return (
    <div
      className={cn(
        'bg-transparent border rounded-lg p-3',
        bgColor,
        borderColor,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{emoji}</span>
        <div className="flex-1">
          <p
            className={cn(
              'text-sm leading-relaxed flex items-center gap-1 italic',
              textColor
            )}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
