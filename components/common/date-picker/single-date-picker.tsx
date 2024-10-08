'use client';

import dayjs from 'dayjs';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { SetStateAction, Dispatch } from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import Popover from '@/components/common/popover';
import { cn } from '@/utils/class-name';

/**
 * SingleDatePicker 컴포넌트의 props 인터페이스
 * @interface SingleDatePickerProps
 * @property {Date | undefined} date - 현재 선택된 날짜
 * @property {Dispatch<SetStateAction<Date | undefined>>} setDate - 날짜를 설정하는 함수
 * @property {string} [className] - 컴포넌트에 적용할 추가 CSS 클래스 이름
 * @property {Object} [classNames] - 컴포넌트의 다양한 부분에 적용할 CSS 클래스 이름
 * @property {Object} [classNames.trigger] - 트리거 버튼에 적용할 클래스 이름들
 * @property {Object} [classNames.trigger.button] - 버튼 자체에 적용할 클래스 이름들
 * @property {string} [classNames.trigger.button.label] - 버튼 라벨에 적용할 클래스 이름
 * @property {string} [classNames.trigger.button.content] - 버튼 내용에 적용할 클래스 이름
 * @property {string} [classNames.trigger.content] - 트리거 컨텐츠에 적용할 클래스 이름
 * @property {string} [classNames.content] - Popover 컨텐츠에 적용할 클래스 이름
 */
interface SingleDatePickerProps {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
  classNames?: {
    trigger?: {
      button?: {
        label?: string;
        content?: string;
      };
      content?: string;
    };
    content?: string;
  };
}

/**
 * 날짜를 선택할 수 있는 날짜 선택기 컴포넌트
 * @param {SingleDatePickerProps} props - 컴포넌트 props
 * @returns {JSX.Element} SingleDatePicker 컴포넌트
 */
export default function SingleDatePicker({
  date,
  setDate,
  className,
  classNames,
}: SingleDatePickerProps) {
  return (
    <Popover className={cn('inline-block relative', className)}>
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
          <div
            className={cn(
              'text-sm flex w-full justify-center p-2',
              classNames?.trigger?.button?.label
            )}
          >
            <span>
              {date
                ? dayjs(date).format('YYYY년 MM월 DD일')
                : '날짜를 선택해 주세요.'}
            </span>
          </div>
        </Button>
      </Popover.Trigger>
      <Popover.Content className={cn('p-0 z-9999', classNames?.content)}>
        <Calendar
          locale={ko}
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </Popover.Content>
    </Popover>
  );
}
