import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/class-name';

import { formattedDatetime } from '../lib';
import { Book } from '../model';

interface BookCardPublisherProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  book: Pick<Book, 'publisher' | 'datetime'>;
}

export function BookCardPublisher({
  className,
  book,
  ...props
}: BookCardPublisherProps) {
  return (
    <p
      className={cn('line-clamp-1 flex break-all text-xs font-bold', className)}
      {...props}
    >
      {book.publisher} · {formattedDatetime(book.datetime)}
    </p>
  );
}
