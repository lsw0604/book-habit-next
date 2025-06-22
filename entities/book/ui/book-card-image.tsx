import { forwardRef } from 'react';
import { BookCardImageProps } from './types';
import { cn } from '@/shared/utils/class-name';
import ImageWrapper from '@/shared/common/image-wrapper';

const BookCardImage = forwardRef<HTMLDivElement, BookCardImageProps>(
  ({ item, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex-shrink-0 overflow-hidden w-[120px]',
          className
        )}
        {...props}
      >
        <ImageWrapper
          src={item.thumbnail}
          alt={`${item.title}-${item.isbns.join('-')}`}
          width={120}
          height={174}
          priority
        />
        {children}
      </div>
    );
  }
);

BookCardImage.displayName = 'BookCardImage';

export default BookCardImage;
