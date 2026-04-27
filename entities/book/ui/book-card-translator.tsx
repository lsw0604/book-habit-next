import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/utils';


interface BookCardTranslatorProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: ReactNode;
}

export function BookCardTranslator({
  className,
  children,
  ...props
}: BookCardTranslatorProps) {
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
