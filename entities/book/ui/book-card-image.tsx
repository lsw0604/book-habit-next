import { forwardRef } from 'react';

import ImageWrapper from '@/shared/common/image-wrapper';
import { cn } from '@/shared/utils/class-name';

import { BookCardImageProps } from './types';

const BookCardImage = forwardRef<HTMLDivElement, BookCardImageProps>(
  ({ item, className, children, ...props }, ref) => (
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
  )
);

BookCardImage.displayName = 'BookCardImage';

export default BookCardImage;
