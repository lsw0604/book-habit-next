'use client';

import { ChevronRightIcon } from 'lucide-react';
import { memo, useCallback } from 'react';

import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { DateLabel } from '@/shared/ui/date-label';
import { cn } from '@/shared/utils';

import { serializeMyBookReview } from '../lib';
import { type MyBookReview, type SerializedMyBookReview } from '../model';

import {
  MyBookReviewStats,
  MyBookReviewText,
  MyBookReviewVisibilityBadge,
} from './components';

export interface MyBookReviewCardProps {
  myBookReview: MyBookReview;
  onClick?: (myBookReview: SerializedMyBookReview) => void;
  className?: string;
}

function MyBookReviewCardComponent({
  myBookReview,
  onClick,
  className,
}: MyBookReviewCardProps) {
  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      const serialized = serializeMyBookReview(myBookReview);
      onClick?.(serialized);
    },
    [myBookReview, onClick]
  );

  return (
    <Card
      className={cn(
        'w-full overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer gap-0 border',
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <CardHeader className="px-4 flex flex-row items-center justify-between">
        <MyBookReviewVisibilityBadge myBookReview={myBookReview} />
        <ChevronRightIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="bg-muted border rounded-lg p-3 h-32 overflow-hidden flex flex-col justify-between">
          <MyBookReviewText myBookReview={myBookReview} variant="truncated" />
          <MyBookReviewStats myBookReview={myBookReview} className="shrink-0" />
        </div>
      </CardContent>
      <CardFooter className="px-4 bg-transparent flex justify-center">
        <DateLabel date={myBookReview}/>
      </CardFooter>
    </Card>
  );
}

export const MyBookReviewCard = memo(MyBookReviewCardComponent);