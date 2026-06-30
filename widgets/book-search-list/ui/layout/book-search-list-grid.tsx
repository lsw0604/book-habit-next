import { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/utils';

const BOOK_SEARCH_LIST_GRID_STYLE = cn(
  'grid w-full grid-cols-1 gap-4',
  'md:grid-cols-2',
  'lg:grid-cols-3',
  'xl:grid-cols-4',
  '2xl:grid-cols-5'
);

type ListGridProps = {
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'ul'>, 'children' | 'className'>;

export const BookSearchListGrid = forwardRef<HTMLUListElement, ListGridProps>(
  ({ children, className, ...rest }, ref) => (
    <ul
      ref={ref}
      className={cn(BOOK_SEARCH_LIST_GRID_STYLE, className)}
      {...rest}
    >
      {children}
    </ul>
  )
);

BookSearchListGrid.displayName = 'BookSearchListGrid';
