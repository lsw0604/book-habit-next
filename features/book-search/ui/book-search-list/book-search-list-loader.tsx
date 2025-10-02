import { BookSearchListGrid } from '../layout';

import { BookSearchItemLoader } from './book-search-item-loader';

interface BookSearchListLoaderProps {
  count?: number;
}

export function BookSearchListLoader({
  count = 20,
}: BookSearchListLoaderProps) {
  return (
    <div className="w-full h-full overflow-y-auto px-4 scrollbar-none">
      <BookSearchListGrid className="pb-4">
        {Array.from({ length: count }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BookSearchItemLoader key={`search-book-item-loader-${index}`} />
        ))}
      </BookSearchListGrid>
    </div>
  );
}
