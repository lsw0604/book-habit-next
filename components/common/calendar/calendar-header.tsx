import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CalendarHeaderProps {
  year: string;
  month: string;
  startDate?: Date;
  endDate?: Date;
  onChange: (update: number) => void;
}

export default function CalendarHeader({
  year,
  month,
  startDate,
  endDate,
  onChange,
}: CalendarHeaderProps) {
  const monthObj = useMemo(
    () => dayjs(`${year}-${month}`).format('YYYY-MM'),
    [year, month]
  );
  const startMonth = useMemo(
    () => (startDate ? dayjs(startDate).format('YYYY-MM') : undefined),
    []
  );
  const endMonth = useMemo(
    () =>
      endDate ? dayjs(endDate).format('YYYY-MM') : dayjs().format('YYYY-MM'),
    []
  );

  const prevMonthHandler = useCallback(() => {
    if (monthObj !== startMonth) {
      onChange(-1);
    }
  }, [month, year, startDate]);

  const nextMonthHandler = useCallback(() => {
    if (monthObj !== endMonth) {
      onChange(1);
    }
  }, [month, year, endDate]);

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
