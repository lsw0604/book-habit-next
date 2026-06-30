import { forwardRef, HTMLAttributes } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

export const BookSearchItemLoader = forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement>
>((props, ref) => (
  <li ref={ref} {...props}>
    <div className="w-full text-left">
      <div className="flex flex-row items-start gap-4 p-3 rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-xl">
        <div className="relative flex-shrink-0 overflow-hidden w-[80px] h-[116px]">
          <Skeleton className="w-[80px] h-[116px] bg-slate-200" />
        </div>
        <div className="flex flex-col grow">
          <Skeleton className="w-[60%] h-5 bg-slate-200 mb-3" />
          <Skeleton className="w-[70%] h-[16px] bg-slate-200 mt-4" />
          <Skeleton className="w-[40%] h-[16px] bg-slate-200 mt-2" />
          <Skeleton className="w-[30%] h-[16px] bg-slate-200 mt-2" />
        </div>
      </div>
    </div>
  </li>
));

BookSearchItemLoader.displayName = 'BookSearchItemLoader';
