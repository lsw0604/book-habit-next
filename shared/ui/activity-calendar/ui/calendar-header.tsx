import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../../button';
import { CalendarHeaderProps } from '../model/types';

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  year,
  month,
  onNavigateMonth,
  onNavigateToToday,
}) => {
  return (
    <div className="flex items-center justify-between px-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigateMonth('prev')}
        aria-label="이전 달"
      >
        <ArrowLeftIcon className="w-4 h-4" />
      </Button>
      <h2 className="text-lg font-semibold">
        {year}년 {month}월
      </h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigateMonth('next')}
        aria-label="다음 달"
      >
        <ArrowRightIcon className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onNavigateToToday}>
        오늘
      </Button>
    </div>
  );
};
