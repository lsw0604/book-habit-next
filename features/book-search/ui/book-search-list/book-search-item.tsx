import { memo, useState } from 'react';

import {
  BookCardAuthor,
  BookCardContent,
  BookCardImage,
  BookCardPrice,
  BookCardPublisher,
  BookCardTitle,
} from '@/entities/book';
import { Book } from '@/entities/book/model';
import { useOnceVisible } from '@/shared/hooks/useInfiniteScroll';
import { CARD_STYLES } from '@/shared/style/card-style';
import { cn } from '@/shared/utils/class-name';

import BookSearchItemLoader from './book-search-item-loader';

interface BookSearchItemProps {
  item: Book;
  onClick?: (selectedBook: Book) => void;
}

function BookSearchItem({ item, onClick }: BookSearchItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useOnceVisible(() => setIsVisible(true), { threshold: 0.1 });

  if (!isVisible) return <BookSearchItemLoader ref={ref} />;

  return (
    <li ref={ref}>
      <button
        type="button"
        onClick={() => onClick?.(item)}
        className={CARD_STYLES.container}
      >
        <BookCardImage item={item} />
        <div className={cn(CARD_STYLES.contentWrapper)}>
          <BookCardTitle>{item.title}</BookCardTitle>
          <BookCardAuthor
            authors={item.authors}
            translators={item.translators}
          />
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
      </button>
    </li>
  );
}

export default memo(BookSearchItem);
