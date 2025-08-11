import { cn } from '@/shared/utils/class-name';

import BookSearchItemLoader from './book-search-item-loader';
import { BOOK_SEARCH_LIST_GRID_STYLE } from '@/shared/style/list-style';

interface BookSearchListLoaderProps {
  count?: number;
}

export default function BookSearchListLoader({
  count = 20,
}: BookSearchListLoaderProps) {
  return (
    <div className="w-full h-full flex flex-col overflow-scroll px-4 scrollbar-none">
      <ul
        className={cn(
          'w-full pb-4 flex flex-col gap-4 overflow-scroll scroll-none',
          BOOK_SEARCH_LIST_GRID_STYLE,
        )}
      >
        {Array.from({ length: count }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BookSearchItemLoader key={`search-book-item-loader-${index}`} />
        ))}
      </ul>
    </div>
  );
}
