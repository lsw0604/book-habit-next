import { Skeleton } from '@/components/ui/skeleton';

export default function MyBookDetailInfoLoader() {
  return (
    <div className="w-full h-full p-4">
      <div className="flex flex-row w-full h-auto shadow-lg rounded-lg:">
        <div className="flex justify-center items-center w-[40%] relative p-4">
          <Skeleton className="w-[120px] h-[174px] rounded-lg bg-slate-200" />
        </div>
        <div className="w-[60%] flex flex-col h-full py-4 pr-4">
          <div className="w-full h-full mb-2">
            <div className="w-full flex flex-col gap-1">
              <Skeleton className="h-2 w-[30%] text-xs bg-slate-200" />
              <Skeleton className="h-4 w-[50%] text-lg bg-slate-200" />
              <Skeleton className="h-2 w-[20%] text-xs bg-slate-200" />
            </div>
          </div>
          <Skeleton className="h-[125px] w-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
