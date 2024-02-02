'use client';

import { SyntheticEvent } from 'react';
import { ko } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';

interface DatePickerProps {
  onChange: () => void;
  date: Date | null;
}

export default function DatePicker({ onChange, date }: DatePickerProps) {
  return (
    <div className="w-full h-full">
      <Calendar locale={ko} />
    </div>
  );
}
