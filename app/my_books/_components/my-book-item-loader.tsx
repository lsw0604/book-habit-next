import { Skeleton } from '@/components/ui/skeleton';
import { forwardRef } from 'react';

const MyBookItemLoader = forwardRef<HTMLLIElement, {}>((props, ref) => {
  return (
    <li ref={ref} className="w-auto h-auto p-1">
      <Skeleton className="w-full relative mb-2 pt-[145%] h-4 rounded-lg overflow-hidden bg-gray-200" />
      <div className="flex flex-col px-2">
        <Skeleton className="w-full h-4 mb-1 bg-gray-200" />
        <Skeleton className="w-2/3 h-4 mb-1 bg-gray-200" />
        <Skeleton className="w-1/2 h-4 bg-gray-200" />
      </div>
    </li>
  );
});

MyBookItemLoader.displayName = 'MyBookItemLoader';

export default MyBookItemLoader;
