import { useQueryParams } from '@/shared/hooks';
import {
  bookSearchParamsSchema,
  BookSearchItemLoader,
} from '@/features/book-search';

import { BookSearchListGrid } from './layout';

export function BookSearchListLoader() {
  const { size: length } = useQueryParams(bookSearchParamsSchema);

  return (
    <div className="w-full h-full overflow-scroll scrollbar-none">
      <BookSearchListGrid className="pb-4">
        {Array.from({ length }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <BookSearchItemLoader key={`search-book-item-loader-${index}`} />
        ))}
      </BookSearchListGrid>
    </div>
  );
}
