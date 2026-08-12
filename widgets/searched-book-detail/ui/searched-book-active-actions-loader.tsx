import { Skeleton } from "@/shared/ui/skeleton";

function SearchedBookActiveActionButtonSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center py-3 rounded-xl border border-gray-200 gap-1.5">
      <Skeleton className="w-[22px] h-[22px] rounded-full" />
      <Skeleton className="w-10 h-3" />
    </div>
  )
}

export function SearchedBookActiveActionsLoader() {
  return (
    <div className="flex flex-col gap-3 w-full bg-white p-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2.5">
        <SearchedBookActiveActionButtonSkeleton />
        <SearchedBookActiveActionButtonSkeleton />
        <SearchedBookActiveActionButtonSkeleton />
      </div>
      <div className="w-full p-4 rounded-xl border transition-all">
        <div className="w-full h-[40px] grid grid-cols-5 place-items-center">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </div>
    </div>
  )
}
