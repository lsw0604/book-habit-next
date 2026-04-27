'use client';

import { memo, useState } from 'react';

import {
  BookCardThumbnail,
  BookCardStatus,
  BookCardAuthor,
  BookCardPublisher,
  BookCardTranslator,
  BookCardPubDate,
  BookSummary,
  formattedAuthor,
} from '@/entities/book';
import { useOnceVisible } from '@/shared/hooks';
import { Card, CardDescription, CardTitle } from '@/shared/ui/card';

import { BookSearchItemLoader } from './book-search-item-loader';

interface BookSearchItemProps {
  item: BookSummary;
  modalHandler?: (item: BookSummary) => void;
}

function BookComponent({ item, modalHandler }: BookSearchItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useOnceVisible(() => setIsVisible(true), { threshold: 0.1 });

  if (!isVisible) return <BookSearchItemLoader ref={ref} />;

  const { thumbnail, title, authors, translators, publisher, pubDate, status } =
    item;

  return (
    <li ref={ref}>
      <button
        type="button"
        onClick={() => modalHandler?.(item)}
        className="w-full text-left"
      >
        <Card className="flex-row items-start gap-4 p-3 transition-shadow hover:shadow-xl">
          <div className="w-[80px] h-[116px] flex-shrink-0">
            <BookCardThumbnail src={thumbnail} alt={title} />
          </div>
          <div className="w-full h-[116px] flex flex-col">
            <CardTitle className="text-sm font-bold line-clamp-2 mb-2">
              {title}
            </CardTitle>
            <div className="h-auto mt-auto flex flex-row flex-grow-0 justify-between">
              <CardDescription className="text-xs">
                <span className="mb-2 flex flex-row gap-1">
                  <BookCardAuthor>{authors}</BookCardAuthor>
                  {translators !== '-' && (
                    <>
                      {' '}
                      {'|'}
                      <BookCardTranslator>{translators}</BookCardTranslator>
                    </>
                  )}
                </span>
                <BookCardPublisher className="mb-2">
                  {publisher}
                </BookCardPublisher>
                <BookCardPubDate>{pubDate}</BookCardPubDate>
              </CardDescription>
              {status !== '정상판매' && (
                <BookCardStatus className="items-center justify-center">
                  절판
                </BookCardStatus>
              )}
            </div>
          </div>
        </Card>
      </button>
    </li>
  );
}

export const BookSearchItem = memo(BookComponent);
