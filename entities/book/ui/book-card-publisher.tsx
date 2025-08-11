import { cn } from '@/shared/utils/class-name';

import { formattedDatetime } from '../lib';

import type { BookCardPublisherProps } from './types';

export default function BookCardPublisher({
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
