import { GlobeIcon, LockIcon } from 'lucide-react';

import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/utils';

import type { MyBookReview } from '../../model';

type MyBookReviewVisibilityBadgeType = Pick<MyBookReview, 'isPublic'>;

interface MyBookReviewVisibilityBadgeProps {
  myBookReview: MyBookReviewVisibilityBadgeType;
  className?: string;
}

export function MyBookReviewVisibilityBadge({
  myBookReview,
  className,
}: MyBookReviewVisibilityBadgeProps) {
  const { isPublic } = myBookReview;

  return (
    <Badge
      variant="outline"
      className={cn('py-1 px-2.5 gap-1.5 font-normal', className)}
    >
      {isPublic ? (
        <>
          <GlobeIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span>공개</span>
        </>
      ) : (
        <>
          <LockIcon className="h-3.5 w-3.5 text-muted-foreground" />
          <span>비공개</span>
        </>
      )}
    </Badge>
  );
}
