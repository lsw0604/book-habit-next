import BookSearchItemLoader from './book-search-item-loader';
import { cn } from '@/shared/utils/class-name';

export default function BookSearchListLoader() {
  return (
    <div className="w-full h-full flex flex-col overflow-scroll px-4 scrollbar-none">
      <ul
        className={cn(
          'w-full pb-4 flex flex-col gap-4 overflew-scroll scroll-none',
          'md:grid md:grid-cols-2 md:gap-4',
          'lg:grid lg:grid-cols-3 lg:gap-4',
          'xl:grid xl:grid-cols-4 xl:gap-4',
          '2xl:grid 2xl:grid-cols-5 2xl:gap-2'
        )}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <BookSearchItemLoader key={index} />
        ))}
      </ul>
    </div>
  );
}
