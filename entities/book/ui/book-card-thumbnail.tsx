import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { BookDetail } from '../model';

interface BookCardThumbnailProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<BookDetail, 'thumbnail'> {
  className?: string;
}

export const BookCardThumbnail = forwardRef<
  HTMLDivElement,
  BookCardThumbnailProps
>(({ thumbnail, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex-shrink-0 overflow-hidden w-full h-full rounded-lg',
      className
    )}
    {...props}
  >
    {thumbnail ? (
      <Image src={thumbnail} fill alt={thumbnail} className="object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-[rgb(241,241,241)]">
        <ImageIcon className="stroke-[rgb(90,90,90)]" />
      </div>
    )}
  </div>
));

BookCardThumbnail.displayName = 'BookCardThumbnail';
