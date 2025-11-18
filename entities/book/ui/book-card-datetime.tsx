import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { formattedDatetime } from '../lib';

interface BookCardDatetimeProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  datetime: Date | null;
}

export function BookCardDatetime({
  className,
  datetime,
  ...props
}: BookCardDatetimeProps) {
  return (
    <p
      className={cn(
        'line-clamp-1 flex break-all text-xs font-medium text-gray-500',
        className
      )}
      {...props}
    >
      {formattedDatetime(datetime)}
    </p>
  );
}
