import { Separator } from '@/shared/ui/separator';
import { Skeleton } from '@/shared/ui/skeleton';
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
              <div className="w-full flex flex-col gap-1 h-auto mt-auto">
                <Skeleton className="w-full h-8" />
                <div className="w-full h-8 grid grid-cols-5">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className="flex w-full justify-center items-center"
                    >
                      <IconStar className="w-8 h-8 fill-muted animate-pulse" />
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Separator className="mt-4 mb-2" />
        <Skeleton className="h-[140px] w-full" />
        <Separator className="my-2" />
      </div>
      <div className="flex justify-between px-2">
        <div className="ml-auto">
          <Skeleton className="w-36 h-4" />
        </div>
      </div>
    </div>
  );
}
