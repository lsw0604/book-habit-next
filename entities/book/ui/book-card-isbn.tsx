import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/class-name';

import { Book } from '../model';

interface BookCardISBNProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  book: Pick<Book, 'isbns'>;
}

export function BookCardISBN({ className, book, ...props }: BookCardISBNProps) {
  return (
    <div className="flex gap-2">
      {book.isbns.map(isbn => (
        <div
          key={isbn}
          className={cn(
            'flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700',
            'line-clamp-1 text-xxs', // 모바일 스타일
            'sm:text-xs sm:line-clamp-none', // sm 브레이크포인트 이상에서의 스타일
            'sm:mt-1 sm:mb-1', // 그리드 레이아웃에서의 여백 조정
            className
          )}
          {...props}
        >
          {isbn}
        </div>
      ))}
    </div>
  );
}
