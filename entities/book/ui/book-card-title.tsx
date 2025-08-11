import { cn } from '@/shared/utils/class-name';

import { BookCardTitleProps } from './types';

const BOOK_CARD_TITLE_STYLE = {
  base: 'font-bold text-foreground text-base mt-1 line-clamp-1 text-lg',
  hover: 'hover:underline',
} as const;

export default function BookCardTitle({
  className,
  children,
  ...props
}: BookCardTitleProps) {
  return (
    <h3
      className={cn(
        BOOK_CARD_TITLE_STYLE.base,
        BOOK_CARD_TITLE_STYLE.hover,
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
