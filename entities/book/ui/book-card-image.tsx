import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { forwardRef, type HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

interface BookCardImageProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  thumbnail: string | null;
}

export const BookCardImage = forwardRef<HTMLDivElement, BookCardImageProps>(
  ({ thumbnail, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex-shrink-0 overflow-hidden w-full h-full rounded-lg',
        className
      )}
      {...props}
    >
      {thumbnail ? (
        <Image src={thumbnail} fill alt="" className="object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[rgb(241,241,241)]">
          <ImageIcon className="stroke-[rgb(90,90,90)]" />
        </div>
      )}
    </div>
  )
);

BookCardImage.displayName = 'BookCardImage';
