import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardTitleProps extends HTMLAttributes<HTMLHeadElement> {
  className?: string;
  title: string;
}

export function BookCardTitle({
  className,
  title,
  ...props
}: BookCardTitleProps) {
  return (
    <h3
      className={cn(
        'font-bold text-foreground text-base mt-1 line-clamp-1',
        'hover:underline',
        className
      )}
      {...props}
    >
      {title}
    </h3>
  );
}
