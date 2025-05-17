import { cn } from '@/shared/utils/class-name';
import { HTMLAttributes } from 'react';

interface BookCardISBNProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  isbn: string;
}

const BOOK_CARD_ISBN_STYLE = {
  base: 'flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700',
  mobile: 'line-clamp-1 text-xxs', // 모바일 스타일
  desktop: 'sm:text-xs sm:line-clamp-none', // sm 브레이크포인트 이상에서의 스타일
  gridLayout: 'sm:mt-1 sm:mb-1', // 그리드 레이아웃에서의 여백 조정
} as const;

export default function BookCardISBN({
  className,
  isbn,
  ...props
}: BookCardISBNProps) {
  return (
    <div
      className={cn(
        BOOK_CARD_ISBN_STYLE.base,
        BOOK_CARD_ISBN_STYLE.mobile,
        BOOK_CARD_ISBN_STYLE.desktop,
        BOOK_CARD_ISBN_STYLE.gridLayout,
        className
      )}
      {...props}
    >
      {isbn}
    </div>
  );
}
