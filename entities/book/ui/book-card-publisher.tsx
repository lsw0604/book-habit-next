import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardPublisherProps extends HTMLAttributes<HTMLParagraphElement> {}

export function BookCardPublisher({
  className,
  children,
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
      {children}
    </p>
  );
}
