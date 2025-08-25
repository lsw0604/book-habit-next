import { forwardRef, HTMLAttributes } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

interface MyBookItemLoaderProps extends HTMLAttributes<HTMLLIElement> {}

export const MyBookItemLoader = forwardRef<
  HTMLLIElement,
  MyBookItemLoaderProps
>((props, ref) => (
  <li ref={ref} className="w-auto h-auto p-1" {...props}>
    <Skeleton className="w-full relative mb-2 pt-[145%] h-4 rounded-lg overflow-hidden bg-gray-200" />
  </li>
));

MyBookItemLoader.displayName = 'MyBookItemLoader';
