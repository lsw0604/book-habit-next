'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  getDay,
  getMonth,
  getYear,
  isBefore,
  isSameDay,
  isValid,
  parse,
  parseISO,
  startOfMonth,
  subMonths,
} from 'date-fns';

interface CalendarState {
  readonly year: number;
  readonly month: number;
  readonly date: Date;
  readonly firstDayOfWeek: number;
  readonly daysInMonth: readonly Date[];
}

interface UseCalendarOptions {
  initialDate?: string | Date;
  locale?: string;
}

const YYYY_MM_DD_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const useCalendar = ({
  initialDate,
  locale = 'ko',
}: UseCalendarOptions = {}) => {
  const [currentDate, setCurrentDate] = useState(() => {
    let dateToInitialize: Date;
    if (initialDate) {
      if (typeof initialDate === 'string') {
        let parsedDate: Date;
        if (YYYY_MM_DD_REGEX.test(initialDate)) {
          // 'YYYY-MM-DD' 형식 파싱
          parsedDate = parse(initialDate, 'yyyy-MM-dd', new Date());
        } else {
          // ISO 8601 형식 등 다른 문자열 형식 시도 (기존 로직)
          parsedDate = parseISO(initialDate);
        }
        dateToInitialize = isValid(parsedDate) ? parsedDate : new Date();
      } else {
        dateToInitialize = new Date(initialDate.getTime());
      }
    } else {
      dateToInitialize = new Date();
    }
    return dateToInitialize;
  });

  const calendarState = useMemo((): CalendarState => {
    const year = getYear(currentDate);
    const month = getMonth(currentDate) + 1; // getMonth는 0부터 시작 (0 = 1월)
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const firstDayOfWeek = getDay(firstDayOfMonth);

    const daysInMonth: Date[] = [];
    let dayIterator = firstDayOfMonth;
    while (
      isBefore(dayIterator, lastDayOfMonth) ||
      isSameDay(dayIterator, lastDayOfMonth)
    ) {
      daysInMonth.push(new Date(dayIterator.getTime())); // 배열에 저장 시 복사본 권장
      dayIterator = addDays(dayIterator, 1);
    }

    return {
      year,
      month,
      date: currentDate,
      firstDayOfWeek,
      daysInMonth: Object.freeze(daysInMonth),
    };
  }, [currentDate]);

  const navigateMonth = useCallback((direction: 'prev' | 'next') => {
    setCurrentDate(
      (
        prevDate // prevDate는 Date 객체
      ) =>
        direction === 'prev' ? subMonths(prevDate, 1) : addMonths(prevDate, 1)
    );
  }, []);

  const navigateToToday = useCallback(() => {
    setCurrentDate(new Date()); // 현재 날짜로 설정
  }, []);

  const navigateToDate = useCallback((date: string | Date) => {
    if (typeof date === 'string') {
      // ISO 문자열이라면 parseISO 사용, 아니면 new Date()로 파싱 시도
      const parsedDate = parseISO(date);
      if (isValid(parsedDate)) {
        setCurrentDate(parsedDate);
      } else {
        // 유효하지 않은 문자열 처리 (예: 오늘 날짜로 설정 또는 오류 처리)
        setCurrentDate(new Date());
      }
    } else {
      // date가 Date 객체인 경우
      setCurrentDate(new Date(date.getTime())); // 복사본으로 설정
    }
  }, []);

  return {
    calendarState,
    navigateMonth,
    navigateToToday,
    navigateToDate,
    currentDate,
  };
};
