// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import type { SelectSingleEventHandler } from 'react-day-picker';

import { cn } from '../utils/class-name';

import { Calendar } from './calendar';
import { Popover } from './popover';

interface SingleDatepickerProps {
  selected?: Date;
  onSelect: SelectSingleEventHandler;
  className?: string;
}

function SingleDatepicker({
  selected,
  onSelect,
  className,
}: SingleDatepickerProps) {
  return (
    <Popover
      className={cn(
        'w-full h-10 border-slate-600 border-2 rounded-lg bg-transparent relative',
        className
      )}
    >
      <Popover.Trigger className="w-full h-full flex flex-1 items-center justify-center">
        <div className="h-10 w-10 flex items-center justify-center">
          <CalendarIcon size={16} className="stroke-slate-600" />
        </div>
        <div className="w-full text-sm py-2 pl-1 pr-11 text-center text-slate-600 font-bold">
          {selected
            ? format(selected, 'yyyy년 MM월 dd일')
            : '날짜를 선택해주세요.'}
        </div>
      </Popover.Trigger>
      <Popover.Content className="p-0 z-9999">
        <Calendar
          locale={ko}
          mode="single"
          selected={selected}
          onSelect={onSelect}
        />
      </Popover.Content>
    </Popover>
  );
}

export { SingleDatepicker };
