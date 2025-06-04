import { useEffect } from 'react';
import { UseInputDatepickerNavigationProps } from '../model/types';
import { MAX_MONTH_DAY_LENGTH, MAX_YEAR_LENGTH } from './constant';

export function useInputDatepickerNavigation({
  date,
  dayRef,
  monthRef,
  yearRef,
}: UseInputDatepickerNavigationProps): void {
  useEffect(() => {
    if (date.year?.length === MAX_YEAR_LENGTH) {
      monthRef.current?.focus();
    }
  }, [date.year, monthRef]);

  useEffect(() => {
    if (date.month?.length === MAX_MONTH_DAY_LENGTH) {
      dayRef.current?.focus();
    }
  }, [date.month, dayRef]);

  useEffect(() => {
    if (date.day?.length === MAX_MONTH_DAY_LENGTH) {
      dayRef.current?.blur();
    }
  }, [date.day, dayRef]);

  // 키보드 네비게이션 로직
  useEffect(() => {
    const monthElement = monthRef.current;
    if (!monthElement) return;
    const handleMonthKeyDown = (event: KeyboardEvent) => {
      if (date.month === '' && event.key === 'Backspace')
        yearRef.current?.focus();
      if (date.month === '' && event.key === 'ArrowLeft')
        yearRef.current?.focus();
      if (date.month === '' && event.key === 'ArrowRight')
        dayRef.current?.focus();
    };
    monthElement.addEventListener('keydown', handleMonthKeyDown);
    return () =>
      monthElement.removeEventListener('keydown', handleMonthKeyDown);
  }, [date.month, monthRef, yearRef, dayRef]); // 의존성 배열에 refs 추가

  useEffect(() => {
    const dayElement = dayRef.current;
    if (!dayElement) return;
    const handleDayKeydown = (event: KeyboardEvent) => {
      if (date.day === '' && event.key === 'Backspace')
        monthRef.current?.focus();
      if (date.day === '' && event.key === 'ArrowLeft')
        monthRef.current?.focus();
    };
    dayElement.addEventListener('keydown', handleDayKeydown);
    return () => dayElement.removeEventListener('keydown', handleDayKeydown);
  }, [date.day, dayRef, monthRef]);

  useEffect(() => {
    const yearElement = yearRef.current;
    if (!yearElement) return;
    const handleYearKeydown = (event: KeyboardEvent) => {
      if (date.year === '' && event.key === 'ArrowRight')
        monthRef.current?.focus();
    };
    yearElement.addEventListener('keydown', handleYearKeydown);
    return () => yearElement.removeEventListener('keydown', handleYearKeydown);
  }, [date.year, yearRef, monthRef]);
}
