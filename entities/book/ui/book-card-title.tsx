import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/class-name';

import { Book } from '../model';

interface BookCardTitleProps extends HTMLAttributes<HTMLHeadElement> {
  className?: string;
  book: Pick<Book, 'title'>;
}

export function BookCardTitle({
  className,
  book,
  ...props
}: BookCardTitleProps) {
  return (
    <h3
      className={cn(
        'font-bold text-foreground text-base mt-1 line-clamp-1',
        'hover:underline',
        className
      )}
      {...props}
    >
      {book.title}
    </h3>
  );
}
