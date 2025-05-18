import type { BookCardPublisherProps } from '../model/types';
import { formattedDatetime } from '../lib';
import { cn } from '@/shared/utils/class-name';

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
