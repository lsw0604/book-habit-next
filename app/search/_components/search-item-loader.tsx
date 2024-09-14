import { Skeleton } from '@/components/ui/skeleton';

export default function SearchItemLoader() {
  return (
    <div className="w-full min-h-[350px] h-auto flex flex-col gap-4 p-4 rounded-2xl border-[none] shadow-lg">
      <div className="flex justify-center items-center">
        <Skeleton className="w-[120px] h-[174px] bg-slate-200" />
      </div>
      <div className="w-full h-full">
        <Skeleton className="w-full h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[300px] h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[250px] h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
      </div>
    </div>
  );
}
