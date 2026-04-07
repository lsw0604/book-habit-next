import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardStatusProps extends HTMLAttributes<HTMLParagraphElement> {}

export function BookCardStatus({
  className,
  children,
  ...props
}: BookCardStatusProps) {
  if (!children) return null;

  return (
    <div
      className={cn('flex items-baseline gap-1 mt-1 mb-1', className)}
      {...props}
    >
      <span className="bg-black text-xs px-2 py-0.5 font-semibold text-white rounded">
        {children}
      </span>
    </div>
  );
}
