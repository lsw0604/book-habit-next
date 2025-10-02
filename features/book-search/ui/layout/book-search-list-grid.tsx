import { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/utils/class-name';

// 바로 옆에 있는 스타일 파일을 가져옵니다.
import { BOOK_SEARCH_LIST_GRID_STYLE } from './book-search-list-grid-style';

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
