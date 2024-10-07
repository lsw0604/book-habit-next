import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';
import { CalendarIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';

interface InputDatePickerProps {
  onChange: (date: Date | undefined) => void;
  value: Date | undefined;
}

export default function InputDatePicker({
  onChange,
  value,
}: InputDatePickerProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [formattedDate, setFormattedDate] = useState<string | null>(
    value ? dayjs(value).format('YYYY년 MM월 DD일') : null
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (!/^\d*$/.test(value)) {
      setFormattedDate(null);
      onChange(undefined);
      return;
    }

    if (value.length === 8) {
      const year = parseInt(value.slice(0, 4), 10);
      const month = parseInt(value.slice(4, 6), 10) - 1;
      const day = parseInt(value.slice(6, 8), 10);

      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        const date = new Date(year, month - 1, day);
        if (dayjs(date).isValid()) {
          setFormattedDate(dayjs(date).format('YYYY년 MM월 DD일'));
          onChange(date);
          return;
        }
      }
      setFormattedDate(null);
      onChange(undefined);
    }
  };

  const handleEditClick = () => {
    setFormattedDate(null);
    setInputValue('');
  };

  return (
    <>
      {formattedDate ? (
        <div
          onClick={handleEditClick}
          className="relative flex w-full h-10 p-2 text-sm border border-input rounded-md justify-center"
        >
          <CalendarIcon className="w-4 h-4 mr-2 absolute top-1/2 -translate-y-1/2 left-2" />
          <span>{formattedDate}</span>
        </div>
      ) : (
        <div className="relative flex w-full h-10 text-sm border border-input rounded-md justify-center">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="YYYY-MM-DD"
            maxLength={8}
            className="border-none focus:outline-none p-2 text-center"
          />
          <CalendarIcon className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-2" />
        </div>
      )}
    </>
  );
}
