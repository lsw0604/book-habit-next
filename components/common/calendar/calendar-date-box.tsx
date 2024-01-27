import { cn } from '@/lib/utils';
import clsx from 'clsx';

interface CalendarDateBoxProps {
  colStart?: number;
  date?: number;
}

export default function CalendarDateBox({
  colStart,
  date,
}: CalendarDateBoxProps) {
  return (
    <div
      className={clsx(
        `col-start-${colStart}`,
        'relative',
        'cursor-pointer',
        'shadow-md',
        'rounded-lg',
        'pb-full'
      )}
    >
      <div className="flex justify-center items-center">
        <div className="absolute top-1 left-2 text-xs">{date}</div>
      </div>
    </div>
  );
}
