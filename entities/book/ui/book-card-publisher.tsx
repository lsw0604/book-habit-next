import { HTMLAttributes } from 'react';
import { formattedDatetime } from '../lib';
import { cn } from '@/shared/utils/class-name';

interface BookCardPublisherProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  publisher: string;
  datetime: string;
}

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
