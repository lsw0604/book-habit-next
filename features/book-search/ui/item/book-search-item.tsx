'use client';

import { memo, useState } from 'react';

import { BookCardThumbnail } from '@/entities/book';
import { useOnceVisible } from '@/shared/hooks';

import { BookSearchItemLoader } from './book-search-item-loader';

import type { BookSummary } from '../../model';

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
        <div className="flex flex-row items-start gap-4 p-3 rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-xl">
          <div className="w-[80px] h-[116px] flex-shrink-0">
            <BookCardThumbnail src={thumbnail} alt={title} />
          </div>
          <div className="w-full h-[116px] flex flex-col">
            <h3 className="text-sm font-bold line-clamp-2 mb-2 text-gray-900">
              {title}
            </h3>
            <div className="h-auto mt-auto flex flex-row flex-grow-0 justify-between items-end">
              <div className="text-xs text-gray-500 space-y-1">
                <span className="flex flex-row gap-1 font-medium">
                  <span className="line-clamp-1 break-all">{authors}</span>
                  {translators !== '-' && (
                    <>
                      {' | '}
                      <span className="line-clamp-1 break-all">{translators}</span>
                    </>
                  )}
                </span>
                <p className="line-clamp-1 break-all font-medium">{publisher}</p>
                <p className="line-clamp-1 break-all font-medium">{pubDate}</p>
              </div>
              {status !== '정상판매' && (
                <div className="flex items-baseline gap-1 mt-1 mb-1 flex-shrink-0">
                  <span className="bg-black text-[10px] px-2 py-0.5 font-semibold text-white rounded">
                    절판
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}

export const BookSearchItem = memo(BookComponent);
