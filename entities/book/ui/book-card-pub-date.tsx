import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardPubDateProps extends HTMLAttributes<HTMLParagraphElement> {}

export function BookCardPubDate({
  className,
  children,
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
      {children}
    </p>
  );
}
