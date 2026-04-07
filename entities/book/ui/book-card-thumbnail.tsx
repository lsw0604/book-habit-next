import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardThumbnailProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  src?: string | null;
  alt: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
}

export const BookCardThumbnail = forwardRef<
  HTMLDivElement,
  BookCardThumbnailProps
>(
  (
    {
      src,
      alt,
      className,
      sizes = '(max-width: 768px) 33vw, 20vw',
      priority = false,
      objectFit = 'cover',
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        'relative flex-shrink-0 overflow-hidden w-full h-full rounded-lg',
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          sizes={sizes}
          priority={priority}
          fill
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            objectFit === 'cover' ? 'object-cover' : 'object-contain'
          )}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[rgb(241,241,241)]">
          <ImageIcon className="stroke-[rgb(90,90,90)]" />
        </div>
      )}
    </div>
  )
);

BookCardThumbnail.displayName = 'BookCardThumbnail';
