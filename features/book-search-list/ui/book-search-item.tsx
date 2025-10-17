'use client';

import { memo, useState } from 'react';

import {
  type SearchBook,
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
  searchBook: SearchBook;
  modalHandler?: (serializedSearchBook: SearchBook) => void;
}

function BookComponent({ searchBook, modalHandler }: BookSearchItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useOnceVisible(() => setIsVisible(true), { threshold: 0.1 });

  if (!isVisible) return <BookSearchItemLoader ref={ref} />;

  return (
    <li ref={ref}>
      <button
        type="button"
        onClick={() => modalHandler?.(searchBook)}
        className="w-full text-left"
      >
        <Card className="flex-row items-start gap-4 py-4 px-2 transition-shadow hover:shadow-xl">
          <BookCardImage
            thumbnail={searchBook.thumbnail}
            isbns={searchBook.isbns}
          />
          <div className="flex flex-col grow">
            <CardTitle className="mt-1 text-base line-clamp-1">
              {searchBook.title}
            </CardTitle>
            <CardDescription className="text-xs">
              <BookCardAuthor
                authors={searchBook.authors}
                translators={searchBook.translators}
              />
            </CardDescription>
            <CardDescription className="flex-col flex text-sm">
              <BookCardPublisher
                publisher={searchBook.publisher}
                datetime={searchBook.datetime}
              />
              <BookCardPrice
                price={searchBook.price}
                sale_price={searchBook.sale_price}
              />
            </CardDescription>
            <CardContent className="px-0 line-clamp-4 break-words">
              <BookCardContent bookContent={searchBook.contents} />
            </CardContent>
          </div>
        </Card>
      </button>
    </li>
  );
}

export const BookSearchItem = memo(BookComponent);
