import type { BookCardContainerProps } from '../model/types';
import { forwardRef } from 'react';
import { cn } from '@/shared/utils/class-name';

const CARD_CONTAINER_STYLE = {
  base: 'w-full h-auto p-4 rounded-2xl border-[none] shadow-lg list-none flex items-start',
  hover: 'hover:shadow-xl transition-shadow duration-200',
  background: 'bg-white/50 backdrop-blur-sm',
} as const;

const BookCardContainer = forwardRef<HTMLLIElement, BookCardContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          CARD_CONTAINER_STYLE.base,
          CARD_CONTAINER_STYLE.hover,
          CARD_CONTAINER_STYLE.background,
          className
        )}
        {...props}
      >
        {children}
      </li>
    );
  }
);

BookCardContainer.displayName = 'BookCardContainer';

export default BookCardContainer;
