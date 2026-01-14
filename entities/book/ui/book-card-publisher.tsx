import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { BookDetail } from '../model';

interface BookCardPublisherProps
  extends HTMLAttributes<HTMLParagraphElement>,
    Pick<BookDetail, 'publisher'> {
  className?: string;
}

export function BookCardPublisher({
  className,
  publisher,
  ...props
}: BookCardPublisherProps) {
  return (
    <p
      className={cn(
        'line-clamp-1 flex break-all text-xs font-medium text-gray-500',
        className
      )}
      {...props}
    >
      {publisher}
    </p>
  );
}
