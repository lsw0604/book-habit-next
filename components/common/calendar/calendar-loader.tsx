import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export default function CalendarLoader() {
  return (
    <>
      <div className="w-full h-10 flex justify-between items-center px-8 mb-2 border-solid border-b-2 border-slate-300">
        <div>
          <ArrowLeftIcon />
        </div>
        <div>
          <Skeleton className="h-6 w-24 bg-slate-100 rounded-lg" />
        </div>
        <div>
          <ArrowRightIcon />
        </div>
      </div>
      <div className="w-full h-[240px] grid grid-cols-7 grid-rows-5 gap-1">
        {[...Array(35)].map((_, i) => (
          <Skeleton className="w-full h-full bg-slate-100 rounded-lg" key={i} />
        ))}
      </div>
    </>
  );
}
