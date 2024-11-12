import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

import { DAY_OF_WEEK } from '@/constant/calendar';

export default function CalendarLoader() {
  return (
    <>
      <div className="w-full">
        <div className="w-full h-auto flex justify-between p-2">
          <div className="h-10 inline-flex items-center justify-center">
            <ArrowLeftIcon className="w-4 h-4" />
          </div>
          <Skeleton className="w-32 h-10" />
          <div className="h-10 inline-flex items-center justify-center">
            <ArrowRightIcon className="w-4 h-4" />
          </div>
          <Skeleton className="w-16 h-10" />
        </div>
      </div>
      <div className="w-full h-full grid grid-cols-7 gap-1 overflow-hidden">
        {DAY_OF_WEEK.map((day) => (
          <div
            className="mb-3 before:box-border after:box-border text-center"
            key={day}
          >
            {day}
          </div>
        ))}
        {[...Array(35)].map((_, idx) => (
          <div className="w-full pt-full relative">
            <Skeleton
              key={idx}
              className="w-full h-full rounded-lg absolute top-0 left-0"
            />
          </div>
        ))}
      </div>
    </>
  );
}
