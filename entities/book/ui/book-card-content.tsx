import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/class-name';

import { Book } from '../model';

interface BookCardContentProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  book: Pick<Book, 'contents'>;
}

export function BookCardContent({
  book,
  className,
  ...props
}: BookCardContentProps) {
  return (
    <p
      className={cn('text-sm font-normal text-gray-800', className)}
      {...props}
    >
      {book.contents === ''
        ? '해당 책의 정보가 등록되지 않았습니다.'
        : book.contents}
    </p>
  );
}
