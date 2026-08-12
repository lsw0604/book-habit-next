/* eslint-disable no-underscore-dangle -- _count is the API's field name */
import { HeartIcon, MessageSquareIcon } from 'lucide-react';

import { cn } from '@/shared/utils';

import type { MyBookReview } from '../../model';

type MyBookReviewStatsType = Pick<MyBookReview, '_count'>;

interface MyBookReviewStatsProps {
  myBookReview: MyBookReviewStatsType;
  className?: string;
}

export function MyBookReviewStats({
  myBookReview,
  className,
}: MyBookReviewStatsProps) {
  const { reviewLike, reviewComment } = myBookReview._count;

  return (
    <div
      className={cn(
        'flex items-center gap-3 text-xs text-muted-foreground',
        className
      )}
    >
      <div className="flex items-center gap-1">
        <HeartIcon className="h-3.5 w-3.5" />
        <span>{reviewLike ?? 0}</span>
      </div>
      <div className="flex items-center gap-1">
        <MessageSquareIcon className="h-3.5 w-3.5" />
        <span>{reviewComment ?? 0}</span>
      </div>
    </div>
  );
}
