import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface MyBookDetailCalendarHeaderProps {
  year: string;
  month: string;
  onChange: (update: number) => void;
  startDate?: string;
  endDate?: string;
}

export default function MyBookDetailCalendarHeader({
  year,
  month,
  onChange,
  startDate,
  endDate,
}: MyBookDetailCalendarHeaderProps) {
  const monthObj = dayjs(`${year}-${month}`).format('YYYY-MM');

  const startMonth = startDate ? dayjs(startDate).format('YYYY-MM') : undefined;
  const endMonth = endDate
    ? dayjs(endDate).format('YYYY-MM')
    : dayjs().format('YYYY-MM');

  const prevMonthHandler = () => {
    if (monthObj !== startMonth) {
      onChange(-1);
    }
  };

  const nextMonthHandler = () => {
    if (monthObj !== endMonth) {
      onChange(1);
    }
  };

  return (
    <div className="w-full h-10 flex justify-between items-center px-8 mb-2 border-solid border-b-2 border-slate-300">
      <div className={cn(monthObj === startMonth && 'opacity-40')}>
        <ArrowLeftIcon onClick={prevMonthHandler} />
      </div>
      <div>
        {year}년 {month}월
      </div>
      <div className={cn(monthObj === endMonth && 'opacity-40')}>
        <ArrowRightIcon onClick={nextMonthHandler} />
      </div>
    </div>
  );
}
