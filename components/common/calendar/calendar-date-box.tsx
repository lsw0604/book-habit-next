import { cn } from '@/utils/class-name';
import { ReactNode } from 'react';

interface CalendarDateBoxProps {
  isToday: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  day: string;
  children?: ReactNode;
}

export default function CalendarDateBox({
  day,
  isToday,
  isSaturday,
  isSunday,
  children,
}: CalendarDateBoxProps) {
  return (
    <>
      <div
        className={cn(
          'absolute top-0 left-0 m-1 z-10',
          isToday ? 'text-blue-900' : '',
          isSunday ? 'text-rose-300' : '',
          isSaturday ? 'text-blue-300' : ''
        )}
      >
        {children ? children : day}
      </div>
      <div
        className={cn(
          'h-full w-full absolute top-0 left-0',
          isToday ? 'bg-blue-200' : '',
          isSunday ? 'bg-gray-100' : '',
          isSaturday ? 'bg-gray-100' : '',
          'hover:bg-gray-200 cursor-pointer'
        )}
      />
    </>
  );
}
