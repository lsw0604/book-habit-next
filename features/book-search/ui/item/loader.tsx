import { forwardRef, HTMLAttributes } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';
import BookItemCard from '@/entities/book/ui/book-item-card';

const BookSearchItemLoader = forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement>
>((props, ref) => {
  return (
    <BookItemCard {...props} ref={ref}>
      <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
        <Skeleton className="w-[120px] h-[174px] bg-slate-200" />
      </div>
      <div className="ml-4 flex flex-col grow w-full">
        <Skeleton className="w-[60%] h-7 bg-slate-200 mb-2 mt-1" />
        <Skeleton className="w-[70%] h-3 bg-slate-200 mb-2" />
        <Skeleton className="w-[80%] h-5 bg-slate-200 mb-2" />
        <Skeleton className="w-full h-16 bg-slate-200 my-1" />
        <Skeleton className="mt-auto w-14 h-3 bg-slate-200" />
      </div>
    </BookItemCard>
  );
});

BookSearchItemLoader.displayName = 'BookSearchItemLoader';

export default BookSearchItemLoader;
