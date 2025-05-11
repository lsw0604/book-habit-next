import type { BookSearchItemProps } from '../model/types';
import {
  formattedAuthor,
  formattedPrice,
  formattedDatetime,
} from '../lib/formatters';
import BookSearchItemLoader from './book-search-item-loader';
import { useBookSearchModal } from '@/features/book-search/lib/hooks';
import BookItemCard from '@/entities/book/ui/book-item-card';
import ImageWrapper from '@/shared/common/image-wrapper';
import { useOnceVisible } from '@/shared/hooks/useInfiniteScroll';
import { useState } from 'react';

export default function BookSearchItem({ item }: BookSearchItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { modalHandler } = useBookSearchModal({ item });
  const ref = useOnceVisible(() => setIsVisible(true), { threshold: 0.1 });

  if (!isVisible) return <BookSearchItemLoader ref={ref} />;

  return (
    <BookItemCard ref={ref} onClick={modalHandler}>
      <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
        <ImageWrapper
          src={item.thumbnail}
          alt={`${item.title}-${item.isbn}`}
          width={120}
          height={174}
          priority
        />
      </div>
      <div className="ml-4 flex flex-col grow">
        <span className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline">
          {item.title}
        </span>
        <div className="line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
          {item.isbn}
        </div>
        <div className="line-clamp-2 flex overflow-hidden whitespace-normal break-all text-sm text-gray-800 my-1">
          {formattedAuthor(item.authors)} | {item.publisher}
        </div>
        <div className="flex flex-row flex-wrap place-items-center items-center justify-start gap-1">
          <span className="font-bold inline-block align-top text-green-800 text-lg">
            {formattedPrice({
              price: item.price,
              sale_price: item.sale_price,
            })}
          </span>
          <span className="inline-block align-top text-sm">
            <span className="font-medium">{item.price}</span>
            <span className="font-light">원</span>
          </span>
          {item.sale_price > 0 ? (
            <span className="text-xs font-medium line-block items-center uppercase text-gray-800">
              ({item.sale_price})
            </span>
          ) : null}
        </div>
        <p className="text-sm font-normal text-gray-800 break-all line-clamp-2">
          {item.contents === ''
            ? '해당 책의 정보가 등록되지 않았습니다.'
            : item.contents}
        </p>
        <div className="mt-auto line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
          {formattedDatetime(item.datetime)}
        </div>
      </div>
    </BookItemCard>
  );
}
