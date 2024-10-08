'use client';

import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CalendarIcon } from 'lucide-react';
import { useEventListener } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Popover from '@/components/common/popover';
import { ErrorMessage } from '@/components/common/error-message';
import { isValidNumericString } from '@/utils/validation';

interface InputDatePickerProps {
  value: Date | undefined;
  onChange: Dispatch<SetStateAction<Date | undefined>>;
}

interface DateState {
  year: string;
  month: string;
  day: string;
}

const MAX_YEAR_LENGTH = 4;
const MAX_MONTH_DAY_LENGTH = 2;

export default function InputDatePicker({
  onChange,
  value,
}: InputDatePickerProps) {
  const [date, setDate] = useState<DateState>({
    year: '',
    month: '',
    day: '',
  });

  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, id } = event.target;
      if (
        !isValidNumericString(
          value,
          id === 'year' ? MAX_YEAR_LENGTH : MAX_MONTH_DAY_LENGTH
        )
      )
        return;

      setDate((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const validateDate = useCallback(() => {
    const { year, month, day } = date;

    if (
      year?.length === MAX_YEAR_LENGTH &&
      month?.length === MAX_MONTH_DAY_LENGTH &&
      day?.length === MAX_MONTH_DAY_LENGTH
    ) {
      if (
        year === '0000' ||
        month === '00' ||
        day === '00' ||
        parseInt(month) > 12 ||
        parseInt(day) > 31
      ) {
        return;
      }

      const dateString = `${year}-${month}-${day}`;
      if (dayjs(dateString).isValid()) {
        onChange(dayjs(dateString).toDate());
        return;
      }
    }
    onChange(undefined);
  }, [date.year, date.month, date.day, onChange]);

  const handleEditClick = useCallback(() => {
    onChange(undefined);
    setDate((prev) => ({
      ...prev,
      year: '',
      month: '',
      day: '',
    }));
  }, [onChange]);

  useEffect(() => {
    validateDate();
  }, [date.year, date.month, date.day, validateDate]);

  useEffect(() => {
    if (date.year?.length === MAX_YEAR_LENGTH) {
      monthRef.current?.focus();
    }
  }, [date.year]);

  useEffect(() => {
    if (date.month?.length === MAX_MONTH_DAY_LENGTH) {
      dayRef.current?.focus();
    }
  }, [date.month]);

  useEffect(() => {
    if (date.day?.length === MAX_MONTH_DAY_LENGTH) {
      dayRef.current?.blur();
    }
  }, [date.day]);

  useEffect(() => {
    if (date.year === '') {
      yearRef.current?.focus();
    }
  }, [date.year]);

  useEventListener(
    'keydown',
    (event) => {
      if (date.month === '' && event.key === 'Backspace') {
        yearRef.current?.focus();
      }
    },
    monthRef
  );

  useEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Backspace' && date.day === '') {
        monthRef.current?.focus();
      }
    },
    dayRef
  );

  return (
    <>
      <div className="flex w-full h-10 text-sm border border-input rounded-md justify-center items-center">
        <div className="flex-1 flex items-center">
          <Popover>
            <Popover.Trigger>
              <Button type="button" variant="ghost" className="p-2">
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content className="p-0 z-9999">
              <Calendar
                defaultMonth={value || dayjs().toDate()}
                initialFocus
                locale={ko}
                mode="single"
                selected={value}
                onSelect={onChange}
              />
            </Popover.Content>
          </Popover>
          {value ? (
            <div
              onClick={handleEditClick}
              className="relative flex w-full h-10 p-2 text-sm justify-center"
            >
              <span>
                {value ? dayjs(value).format('YYYY년 MM월 DD일') : null}
              </span>
            </div>
          ) : (
            <div className="inline-flex justify-center items-center">
              <input
                id="year"
                type="number"
                ref={yearRef}
                value={date.year || ''}
                onChange={handleInputChange}
                placeholder="YYYY"
                maxLength={4}
                className="border-none focus:outline-none py-2 w-1/6 box-border text-center h-full"
              />
              <span className="text-gray-400">-</span> 
              <input
                id="month"
                type="number"
                ref={monthRef}
                value={date.month || ''}
                onChange={handleInputChange}
                placeholder="MM"
                maxLength={2}
                className="border-none focus:outline-none py-2 w-1/6 box-border text-center h-full"
              />
              <span className="text-gray-400">-</span>
              <input
                id="day"
                type="number"
                ref={dayRef}
                value={date.day || ''}
                onChange={handleInputChange}
                placeholder="DD"
                maxLength={2}
                className="border-none focus:outline-none py-2 w-1/6 box-border text-center h-full"
              />
            </div>
          )}
        </div>
      </div>
      {parseInt(date.month as string) > 12 && (
        <ErrorMessage className="ml-auto mr-auto">
          월은 1에서 12 사이의 값을 입력해야 합니다.
        </ErrorMessage>
      )}
      {parseInt(date.day as string) > 31 && (
        <ErrorMessage className="ml-auto mr-auto">
          일은 1에서 31 사이의 값을 입력해야 합니다.
        </ErrorMessage>
      )}
    </>
  );
}
