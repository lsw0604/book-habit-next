import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/class-name';
import { createMarkUp } from '@/shared/utils/create-mark-up';

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
  if (book.contents === '') {
    return (
      <p
        className={cn('text-sm font-normal text-gray-800', className)}
        {...props}
      >
        해당 책의 정보가 등록되지 않았습니다.
      </p>
    );
  }

  return (
    <p
      className={cn('text-gray-800 text-sm font-normal', className)}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={createMarkUp(book.contents)}
      {...props}
    />
  );
}
