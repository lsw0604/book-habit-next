import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { BookDetail } from '../model';

interface BookCardAuthorProps
  extends HTMLAttributes<HTMLParagraphElement>,
    Pick<BookDetail, 'authors'> {
  className?: string;
}

export function BookCardAuthor({
  className,
  authors,
  ...props
}: BookCardAuthorProps) {
  return (
    <p
      className={cn(
        'line-clamp-1 flex break-all text-xs font-medium text-gray-500',
        className
      )}
      {...props}
    >
      {authors}
    </p>
  );
}
