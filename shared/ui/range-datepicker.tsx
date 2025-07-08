import type { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { CalendarIcon } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar } from './calendar';
import { Popover } from './popover';
import { cn } from '../utils/class-name';

interface RangeDatepickerProps {
  selected: DateRange | undefined;
  onSelect: SelectRangeEventHandler;
  className?: string;
  numberOfMonths?: number;
}

export const RangeDatepicker = ({
  selected,
  onSelect,
  className,
  numberOfMonths = 2,
}: RangeDatepickerProps) => {
  function message(from: Date | undefined, to: Date | undefined) {
    if (!from && !to) return '날짜를 선택해주세요.';
    if (from && to && isSameDay(from, to)) return format(from, 'yyyy-MM-dd');
    if (from && !to) return `${format(from, 'yyyy-MM-dd')} - 종료 날짜 선택`;
    if (from && to)
      return `${format(from, 'yyyy-MM-dd')} ~ ${format(to, 'yyyy-MM-dd')}`;
    return '예기치 못한 에러가 발생했습니다.';
  }

  return (
    <Popover
      className={cn(
        'w-full h-10 border-slate-600 border-2 bg-transparent rounded-lg relative',
        className
      )}
    >
      <Popover.Trigger className="w-full h-full flex flex-1 items-center justify-center">
        <div className="h-10 w-10 flex items-center justify-center">
          <CalendarIcon size={16} className="stroke-slate-600" />
        </div>
        <div className="w-full text-sm py-2 pl-1 pr-11 text-center text-slate-600 font-bold">
          {message(selected?.from, selected?.to)}
        </div>
      </Popover.Trigger>
      <Popover.Content className="p-0 z-9999">
        <Calendar
          locale={ko}
          mode="range"
          defaultMonth={new Date()}
          selected={selected}
          onSelect={onSelect}
          numberOfMonths={numberOfMonths}
          initialFocus
        />
      </Popover.Content>
    </Popover>
  );
};
