import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/class-name';

import { formattedAuthor, formattedTranslator } from '../lib';
import { Book } from '../model';

interface BookCardAuthorProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  book: Pick<Book, 'authors' | 'translators'>;
}

export function BookCardAuthor({
  className,
  book,
  ...props
}: BookCardAuthorProps) {
  return (
    <p
      className={cn(
        'line-clamp-2 overflow-hidden whitespace-normal break-all text-xs text-gray-800 my-1',
        className
      )}
      {...props}
    >
      {formattedAuthor(book.authors)}
      {book.translators.length !== 0 && ' | '}
      {formattedTranslator(book.translators)}
    </p>
  );
}
