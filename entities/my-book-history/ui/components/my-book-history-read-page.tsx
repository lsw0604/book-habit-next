import { BookOpenIcon } from 'lucide-react';

import { cn } from '@/shared/utils';

import { calculatePages } from '../../lib';
import { MyBookHistory } from '../../model';

type MyBookHistoryReadPageType = Pick<MyBookHistory, 'startPage' | 'endPage'>;

interface MyBookHistoryReadPageProps {
  history: MyBookHistoryReadPageType;
  className?: string;
}

export function MyBookHistoryReadPage({
  history,
  className,
}: MyBookHistoryReadPageProps) {
  const pagesRead = calculatePages(history.startPage, history.endPage);

  return (
    <div className={cn('bg-transparent border rounded-lg p-3', className)}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium text-foreground">읽은 페이지</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-foreground">
          {pagesRead}
          <span className="text-lg font-normal">p</span>
        </span>
        <span className="text-xs text-muted-foreground mt-0.5">
          {history.startPage}p - {history.endPage}p
        </span>
      </div>
    </div>
  );
}
