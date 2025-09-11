import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/utils';

import { parseMoodLabel } from '../../lib';
import { MyBookHistory } from '../../model';

type MyBookHistoryBadgeType = Pick<MyBookHistory, 'readingMood'>;

interface MyBookHistoryBadgeProps {
  history: MyBookHistoryBadgeType;
  className?: string;
}

export function MyBookHistoryBadge({
  className,
  history,
}: MyBookHistoryBadgeProps) {
  const { emoji, label } = parseMoodLabel(history.readingMood);
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-xl">{emoji}</span>
      <Badge variant="outline" className="py-1 text-muted-foreground">
        {label}
      </Badge>
    </div>
  );
}
