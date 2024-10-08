'use client';

import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { SetStateAction, Dispatch } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import Popover from '@/components/common/popover';
import { cn } from '@/utils/class-name';
import { DateRange } from 'react-day-picker';

/**
 * RangeDatePicker 컴포넌트의 props 인터페이스
 * @interface RangeDatePickerProps
 * @property {DateRange | undefined} date - 현재 선택된 날짜 범위
 * @property {Dispatch<SetStateAction<DateRange | undefined>>} setDate - 날짜 범위를 설정하는 함수
 * @property {Object} [classNames] - 컴포넌트의 다양한 부분에 적용할 CSS 클래스 이름
 * @property {string} [classNames.popover] - Popover 컴포넌트에 적용할 클래스 이름
 * @property {Object} [classNames.trigger] - 트리거 버튼에 적용할 클래스 이름들
 * @property {Object} [classNames.trigger.button] - 버튼 자체에 적용할 클래스 이름들
 * @property {string} [classNames.trigger.button.label] - 버튼 라벨에 적용할 클래스 이름
 * @property {string} [classNames.trigger.button.content] - 버튼 내용에 적용할 클래스 이름
 * @property {string} [classNames.trigger.content] - 트리거 컨텐츠에 적용할 클래스 이름
 * @property {string} [classNames.content] - Popover 컨텐츠에 적용할 클래스 이름
 * @property {number} [numberOfMonths] - 한 번에 표시할 월 수
 */
interface RangeDatePickerProps {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  classNames?: {
    popover?: string;
    trigger?: {
      button?: {
        label?: string;
        content?: string;
      };
      content?: string;
    };
    content?: string;
  };
  numberOfMonths?: number;
}

/**
 * 날짜 범위를 선택할 수 있는 날짜 선택기 컴포넌트
 * @param {RangeDatePickerProps} props - 컴포넌트 props
 * @returns {JSX.Element} RangeDatePicker 컴포넌트
 */
export default function RangeDatePicker({
  date,
  setDate,
  classNames,
  numberOfMonths = 2,
}: RangeDatePickerProps) {
  return (
    <Popover className={cn('inline-block relative', classNames?.popover)}>
      <Popover.Trigger
        className={cn('w-auto relative', classNames?.trigger?.content)}
      >
        <Button
          type="button"
          variant="outline"
          className={cn(
            'w-full flex-1 flex items-center px-0',
            classNames?.trigger?.button?.content
          )}
        >
          <div className="p-2">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div className="flex w-full justify-center p-2">
            <span className={cn('text-sm', classNames?.trigger?.button?.label)}>
              {date?.from ? (
                dayjs(date.from).format('YYYY년 MM월 DD일') !==
                dayjs(date.to).format('YYYY년 MM월 DD일') ? (
                  <>
                    {`${dayjs(date.from).format('YYYY년 MM월 DD일')} - ${dayjs(
                      date.to
                    ).format('YYYY년 MM월 DD일')}`}
                  </>
                ) : (
                  dayjs(date.from).format('YYYY년 MM월 DD일')
                )
              ) : (
                <span>날짜를 선택해 주세요.</span>
              )}
            </span>
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Content className={cn('p-0 z-9999', classNames?.content)}>
        <Calendar
          locale={ko}
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={numberOfMonths}
          initialFocus
        />
      </Popover.Content>
    </Popover>
  );
}
