import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { formattedDatetime } from '../lib';

interface BookCardPublisherProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  publisher: string;
  datetime: Date | null;
}

export function BookCardPublisher({
  className,
  publisher,
  datetime,
  ...props
}: BookCardPublisherProps) {
  return (
    <p
      className={cn('line-clamp-1 flex break-all text-xs font-bold', className)}
      {...props}
    >
      {publisher} · {formattedDatetime(datetime)}
    </p>
  );
}
