import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { IconStar } from '@/style/icon';

export default function MyBookDetailLoader() {
  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg bg-transparent p-2">
      <div className="flex flex-col">
        <div className="flex">
          <div className="flex w-full">
            <Skeleton className="w-[120px] h-[174px]" />
            <div className="ml-4 flex flex-col grow">
              <Skeleton className="h-6 w-3/4 mt-1" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-full mt-1" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
          </div>
        </div>
        <Separator className="mt-2" />
        <div className="flex w-full overflow-x-auto pb-2">
          <div className="overflow-auto flex gap-1 flex-nowrap w-max mt-2 no-scrollbar">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </div>
      <div className="w-full flex gap-2 h-auto">
        <Skeleton className="w-full h-10" />
        <div className="w-full h-10 grid grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <i key={index} className="flex w-full justify-center items-center">
              <IconStar className="w-8 h-8 fill-muted animate-pulse" />
            </i>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4 px-2">
        <div className="ml-auto">
          <Skeleton className="w-36 h-4" />
        </div>
      </div>
    </div>
  );
}
