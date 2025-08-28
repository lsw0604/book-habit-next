import { ComponentType } from 'react';

import { DayComponentProps } from './day-component.type';
/**
 * * 캘린더에 표시될 활동 데이터를 저장하는 객체 타입입니다.
 * * 날짜 문자열('YYYY-MM-DD')을 키로 사용하고, 해당 날짜의 데이터 배열을 값으로 가집니다.
 * @template T - 각 날짜에 연결될 데이터의 타입입니다.
 * @example
 * ```
 * const myData: CalendarData<MyActivity> = {
 * '2025-06-10': [{ id: 1, title: 'Project A' }],
 * '2025-06-12': [{ id: 2, title: 'Meeting' }, { id: 3, title: 'Review' }]
 * }
 * ```
 */
interface CalendarData<T> {
  readonly [dateKey: string]: readonly T[];
}

/**
 * * 메인 캘린더 컴포넌트(`ActivityCalendar`)의 props 타입입니다.
 * @template T - 각 날짜에 연결될 데이터의 타입입니다.
 */
export interface CalendarProps<T> {
  readonly selectedDate?: Date | null;
  readonly data?: CalendarData<T>;
  readonly DayComponent?: ComponentType<DayComponentProps<T>>;
  readonly initialDate?: string | Date;
  readonly className?: string;
  readonly onDateClick?: (date: Date) => void;
  readonly onTodayClick?: () => void;
}
