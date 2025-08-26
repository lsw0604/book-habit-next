import { forwardRef, HTMLAttributes } from 'react';

import { Card } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export const BookSearchItemLoader = forwardRef<
  HTMLLIElement,
  HTMLAttributes<HTMLLIElement>
>((props, ref) => (
  <li ref={ref} {...props}>
    <div className="w-full text-left">
      <Card className="flex-row items-start gap-4 py-4 px-2 transition-shadow hover:shadow-xl">
        <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
          <Skeleton className="w-[120px] h-[174px] bg-slate-200" />
        </div>
        <div className="flex flex-col grow">
          <Skeleton className="w-[60%] h-[24px] bg-slate-200 mt-1" />
          <Skeleton className="w-[40%] h-[16px] bg-slate-200 my-1" />
          <Skeleton className="w-[30%] h-[16px] bg-slate-200" />
          <div className="my-1 flex items-baseline gap-1 h-[21px]">
            <Skeleton className="w-[40px] h-[20px] bg-slate-200" />
            <Skeleton className="w-[60px] h-[20px] bg-slate-200" />
            <Skeleton className="w-[48px] h-[16px] bg-slate-200" />
          </div>
          <Skeleton className="w-full h-[80px] bg-slate-200" />
        </div>
      </Card>
    </div>
  </li>
));

BookSearchItemLoader.displayName = 'BookSearchItemLoader';
