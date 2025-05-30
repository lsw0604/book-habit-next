'use client';

import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CalendarIcon } from 'lucide-react';
import { useEventListener } from 'usehooks-ts';
import { SelectSingleEventHandler } from 'react-day-picker';

import Popover from '@/shared/common/popover';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { ErrorMessage } from '@/shared/common/error-message';
import { cn } from '@/shared/utils/class-name';
import { isValidNumericString } from '@/utils/validation';

interface InputDatePickerProps {
  value: Date | undefined;
  onChange: SelectSingleEventHandler;
  className?: string;
  classNames?: {
    popover?: {
      wrapper?: string;
      trigger?: string;
      content?: string;
      button?: string;
    };
    content?: {
      wrapper?: string;
      span?: string;
    };
    input?: {
      container?: string;
      year?: string;
      month?: string;
      day?: string;
    };
  };
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
  className,
  classNames,
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

      setDate(prev => ({ ...prev, [id]: value }));
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
        onChange(
          dayjs(dateString).toDate(),
          new Date(),
          {},
          new MouseEvent('click') as unknown as React.MouseEvent<
            Element,
            MouseEvent
          >
        );
        return;
      }
    }
    onChange(
      undefined,
      new Date(),
      {},
      new MouseEvent('click') as unknown as React.MouseEvent<
        Element,
        MouseEvent
      >
    );
  }, [date.year, date.month, date.day, onChange]);

  const handleEditClick = useCallback(() => {
    onChange(
      undefined,
      new Date(),
      {},
      new MouseEvent('click') as unknown as React.MouseEvent<
        Element,
        MouseEvent
      >
    );
    console.log('clicked');
    setDate(prev => ({
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
    event => {
      if (date.month === '' && event.key === 'Backspace') {
        yearRef.current?.focus();
      }
    },
    monthRef
  );

  useEventListener(
    'keydown',
    event => {
      if (event.key === 'Backspace' && date.day === '') {
        monthRef.current?.focus();
      }
    },
    dayRef
  );

  return (
    <>
      <div
        className={cn(
          'flex w-full h-10 text-sm border border-input rounded-md justify-center items-center',
          className
        )}
      >
        <div className="flex-1 flex items-center">
          <Popover className={cn(classNames?.popover?.wrapper)}>
            <Popover.Trigger className={cn(classNames?.popover?.trigger)}>
              <Button
                type="button"
                variant="none"
                className={cn('p-2', classNames?.popover?.button)}
              >
                <CalendarIcon className="w-4 h-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content
              className={cn('p-0 z-9999', classNames?.popover?.content)}
            >
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
              className={cn(
                'relative flex w-full h-10 p-2 text-sm justify-center',
                classNames?.content?.wrapper
              )}
            >
              <span className={cn(classNames?.content?.span)}>
                {value ? dayjs(value).format('YYYY년 MM월 DD일') : null}
              </span>
            </div>
          ) : (
            <div
              className={cn(
                'inline-flex justify-center items-center',
                classNames?.input?.container
              )}
            >
              <input
                id="year"
                type="text"
                ref={yearRef}
                value={date.year || ''}
                onChange={handleInputChange}
                placeholder="YYYY"
                maxLength={4}
                className={cn(
                  'border-none focus:outline-none py-2 w-1/6 box-border text-center h-full',
                  classNames?.input?.year
                )}
              />
              <span className="text-gray-400">-</span>
              <input
                id="month"
                type="text"
                ref={monthRef}
                value={date.month || ''}
                onChange={handleInputChange}
                placeholder="MM"
                maxLength={2}
                className={cn(
                  'border-none focus:outline-none py-2 w-1/6 box-border text-center h-full',
                  classNames?.input?.month
                )}
              />
              <span className="text-gray-400">-</span>
              <input
                id="day"
                type="text"
                ref={dayRef}
                value={date.day || ''}
                onChange={handleInputChange}
                placeholder="DD"
                maxLength={2}
                className={cn(
                  'border-none focus:outline-none py-2 w-1/6 box-border text-center h-full',
                  classNames?.input?.day
                )}
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
