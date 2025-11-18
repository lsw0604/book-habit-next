import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardStatusProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  status: string | null;
}

export function BookCardStatus({
  className,
  status,
  ...props
}: BookCardStatusProps) {
  const isDiscontinued = status !== '정상판매';

  return isDiscontinued ? (
    <div
      className={cn('flex items-baseline gap-1 mt-1 mb-1', className)}
      {...props}
    >
      <span className="bg-black text-xs px-2 py-0.5 font-semibold text-white rounded">
        절판
      </span>
    </div>
  ) : null;
}
