import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface CalendarHeaderProps {
  year: string;
  month: string;
  onChange: (update: number) => void;
}

export default function CalendarHeader({
  year,
  month,
  onChange,
}: CalendarHeaderProps) {
  return (
    <div className="w-full h-10 flex justify-between items-center px-8 mb-2">
      <div>
        <ArrowLeftIcon onClick={() => onChange(-1)} />
      </div>
      <div>
        {year} {month}
      </div>
      <div>
        <ArrowRightIcon onClick={() => onChange(1)} />
      </div>
    </div>
  );
}
