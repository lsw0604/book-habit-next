import { Skeleton } from '@/shared/ui/skeleton';

function SearchedBookActiveActionButtonSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border border-gray-200">
      <Skeleton className="w-[22px] h-[22px] rounded-full" />
      <Skeleton className="w-10 h-3" />
    </div>
  );
}

export function SearchedBookActiveActionsLoader() {
  return (
    <div className="flex flex-col gap-3 w-full bg-white p-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2.5">
        <SearchedBookActiveActionButtonSkeleton />
        <SearchedBookActiveActionButtonSkeleton />
        <SearchedBookActiveActionButtonSkeleton />
      </div>
    </div>
  );
}
