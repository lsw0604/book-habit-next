'use client';

import * as React from 'react';
import { TimePicker } from './ui/time-picker';

export function TimePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col items-center gap-4">
      <p>Selected time: {date?.toLocaleTimeString()}</p>
      <TimePicker value={date} onChange={value => setDate(value)} />
    </div>
  );
}
