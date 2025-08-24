import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { DateRange, SelectRangeEventHandler } from 'react-day-picker';

import { Calendar } from '@/shared/ui/calendar';
import { Popover } from '@/shared/ui/popover';
import { cn } from '@/shared/utils/class-name';

import { dateRangeDisplay } from '../lib/formatters';

interface RangeDatepickerProps {
  selected: DateRange | undefined;
  onSelect: SelectRangeEventHandler;
  className?: string;
  numberOfMonths?: number;
}

function RangeDatepicker({
  selected,
  onSelect,
  className,
  numberOfMonths = 2,
}: RangeDatepickerProps) {
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
          {dateRangeDisplay(selected)}
        </div>
      </Popover.Trigger>
      <Popover.Content className="p-0 z-9999">
        <Calendar
          locale={ko}
          mode="range"
          defaultMonth={selected?.from || new Date()}
          selected={selected}
          onSelect={onSelect}
          numberOfMonths={numberOfMonths}
          initialFocus
        />
      </Popover.Content>
    </Popover>
  );
}

export default RangeDatepicker;
