import { Skeleton } from '@/components/ui/skeleton';

export default function MyBookCommentItemLoader() {
  return (
    <li className="snap-start">
      <div className="flex flex-col gap-2 p-2 border-2 transition-all w-full mb-1 rounded-md">
        <div className="flex w-full h-5">
          <Skeleton className="h-full w-12" />
          <Skeleton className="ml-auto h-full w-28" />
        </div>
        <div className="w-full h-40">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="w-full">
          <div className="ml-auto flex gap-2 items-center">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-16 h-4" />
          </div>
        </div>
      </div>
    </li>
  );
}
