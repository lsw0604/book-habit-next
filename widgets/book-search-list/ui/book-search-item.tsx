import type { BookSearchItemProps } from './types';
import { useState } from 'react';
import BookSearchItemLoader from './book-search-item-loader';
import {
  BookCardTitle,
  BookCardAuthor,
  BookCardContent,
  BookCardPrice,
  BookCardPublisher,
} from '@/entities/book';
import { useBookSearchModal } from '@/features/book-search/hooks';
import { BookCardImage } from '@/entities/book';
import { useOnceVisible } from '@/shared/hooks/useInfiniteScroll';
import { cn } from '@/shared/utils/class-name';
import { CARD_STYLES } from '@/shared/style/card-style';

export default function BookSearchItem({ item }: BookSearchItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { modalHandler } = useBookSearchModal({ item });
  const ref = useOnceVisible(() => setIsVisible(true), { threshold: 0.1 });

  if (!isVisible) return <BookSearchItemLoader ref={ref} />;

  return (
    <li ref={ref} onClick={modalHandler} className={cn(CARD_STYLES.container)}>
      <BookCardImage item={item} />
      <div className={cn(CARD_STYLES.contentWrapper)}>
        <BookCardTitle>{item.title}</BookCardTitle>
        <BookCardAuthor authors={item.authors} translators={item.translators} />
        <BookCardPublisher
          datetime={item.datetime}
          publisher={item.publisher}
        />
        <BookCardPrice price={item.price} salePrice={item.salePrice} />
        <BookCardContent
          content={item.contents}
          className="line-clamp-3 break-words"
        />
      </div>
    </li>
  );
}
