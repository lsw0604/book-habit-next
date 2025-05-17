import { forwardRef } from 'react';
import { cn } from '@/shared/utils/class-name';
import { BookCardContentProps } from '../model/types';
import BookCardTitle from './book-card-title';
import BookCardAuthor from './book-card-author';
import BookCardPrice from './book-card-price';
import BookCardContents from './book-card-contents';
import BookCardPublisher from './book-card-publisher';

const BookCardContent = forwardRef<HTMLDivElement, BookCardContentProps>(
  ({ className, item, variant = 'list', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('ml-4 flex flex-col grow', className)}
        {...props}
      >
        <BookCardTitle>{item.title}</BookCardTitle>
        <BookCardAuthor authors={item.authors} translators={item.translators} />
        <BookCardPublisher
          datetime={item.datetime}
          publisher={item.publisher}
        />
        <BookCardPrice price={item.price} sale_price={item.sale_price} />
        <BookCardContents contents={item.contents} />
      </div>
    );
  }
);

BookCardContent.displayName = 'BookCardContent';

export default BookCardContent;
