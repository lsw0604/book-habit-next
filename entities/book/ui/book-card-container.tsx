import type { BookCardContainerProps } from '../model/types';
import { forwardRef } from 'react';
import { cn } from '@/shared/utils/class-name';

const BookCardContainer = forwardRef<HTMLLIElement, BookCardContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={cn(
          'w-full h-auto p-4 rounded-2xl border-[none] shadow-lg clear-both',
          className
        )}
        {...props}
      >
        <div className="flex">
          <div className="flex w-full">{children}</div>
        </div>
      </li>
    );
  }
);

BookCardContainer.displayName = 'BookCardContainer';

export default BookCardContainer;
