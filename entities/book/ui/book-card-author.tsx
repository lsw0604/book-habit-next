import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardAuthorProps extends HTMLAttributes<HTMLParagraphElement> {}

export function BookCardAuthor({
  className,
  children,
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
      {children}
    </p>
  );
}
