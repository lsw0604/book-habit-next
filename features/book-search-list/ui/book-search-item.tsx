'use client';

import { memo, useState } from 'react';

import {
  type Book,
  BookCardAuthor,
  BookCardContent,
  BookCardImage,
  BookCardPrice,
  BookCardPublisher,
} from '@/entities/book';
import { useOnceVisible } from '@/shared/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/shared/ui/card';

import { BookSearchItemLoader } from './book-search-item-loader';

interface BookSearchItemProps {
  book: Book;
  modalHandler?: (selectedBook: Book) => void;
}

function BookComponent({ book, modalHandler }: BookSearchItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useOnceVisible(() => setIsVisible(true), { threshold: 0.1 });

  if (!isVisible) return <BookSearchItemLoader ref={ref} />;

  return (
    <li ref={ref}>
      <button
        type="button"
        onClick={() => modalHandler?.(book)}
        className="w-full text-left"
      >
        <Card className="flex-row items-start gap-4 py-4 px-2 transition-shadow hover:shadow-xl">
          <BookCardImage book={book} />
          <div className="flex flex-col grow">
            <CardTitle className="mt-1 text-base line-clamp-1">
              {book.title}
            </CardTitle>
            <CardDescription className="text-xs">
              <BookCardAuthor book={book} />
            </CardDescription>
            <CardDescription className="flex-col flex text-sm">
              <BookCardPublisher book={book} />
              <BookCardPrice book={book} />
            </CardDescription>
            <CardContent className="px-0 line-clamp-4 break-words">
              <BookCardContent book={book} />
            </CardContent>
          </div>
        </Card>
      </button>
    </li>
  );
}

export const BookSearchItem = memo(BookComponent);
