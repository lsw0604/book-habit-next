import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { BookDetail } from '../model';

interface BookCardPubDateProps
  extends HTMLAttributes<HTMLParagraphElement>,
    Pick<BookDetail, 'pubDate'> {
  className?: string;
}

export function BookCardPubDate({
  className,
  pubDate,
  ...props
}: BookCardPubDateProps) {
  return (
    <p
      className={cn(
        'line-clamp-1 flex break-all text-xs font-medium text-gray-500',
        className
      )}
      {...props}
    >
      {pubDate}
    </p>
  );
}
