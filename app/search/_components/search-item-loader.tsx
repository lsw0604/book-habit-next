import { Skeleton } from '@/components/ui/skeleton';

export function SearchItemLoader() {
  return (
    <li className="w-full h-auto p-4 rounded-2xl shadow-lg">
      <div className="flex">
        <div className="flex w-full">
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
        </div>
      </div>
    </li>
  );
}
