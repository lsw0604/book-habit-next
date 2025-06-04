import { useState, useRef, useCallback, useEffect, ChangeEvent } from 'react';
import { isValid, parse, format, isSameDay } from 'date-fns';
import { ActiveModifiers } from 'react-day-picker';
import { isValidNumericString } from '@/utils/validation';
import { DateState, UseInputDatepickerProps } from '../model/types';
import { MAX_MONTH_DAY_LENGTH, MAX_YEAR_LENGTH } from './constant';
import { useInputDatepickerNavigation } from './useInputDatepickerNavigation';
import { useInputDatepickerValidation } from './useInputDatepickerValidation';

export function useInputDatePicker({
  value: initialValue,
  onChange: onChangeCallback,
}: UseInputDatepickerProps) {
  const [date, setDate] = useState<DateState>({
    year: '',
    month: '',
    day: '',
  });

  const yearRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);

  useInputDatepickerNavigation({ date, monthRef, yearRef, dayRef });

  const {
    isMonthInvalid,
    isDayInvalidBasic,
    isDateCompositionInvalid,
    areAllFieldsFilled,
    parsedValidDate, // 유효한 경우 파싱된 Date 객체, 아니면 null
  } = useInputDatepickerValidation(date);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value: inputValue, id } = event.target;
      if (
        !isValidNumericString(
          inputValue,
          id === 'year' ? MAX_YEAR_LENGTH : MAX_MONTH_DAY_LENGTH
        )
      )
        return;
      setDate(prev => ({ ...prev, [id]: inputValue }));
    },
    []
  );

  const handleValidationAndChange = useCallback(() => {
    // 1. 모든 필드가 채워졌는지 확인
    if (!areAllFieldsFilled) {
      if (initialValue !== undefined) {
        onChangeCallback(
          undefined,
          initialValue,
          {} as ActiveModifiers,
          new MouseEvent('click') as unknown as React.MouseEvent<
            Element,
            MouseEvent
          >
        );
      }
      return;
    }

    if (isMonthInvalid || isDayInvalidBasic || isDateCompositionInvalid) {
      // 유효하지 않은 경우 (월 범위, 일 범위, 또는 날짜 조합 오류)
      // initialValue가 이미 undefined이고, 사용자 입력도 없는 상태라면 불필요한 호출을 피할 수 있음
      if (initialValue !== undefined || date.year || date.month || date.day) {
        onChangeCallback(
          undefined,
          initialValue as Date,
          {} as ActiveModifiers,
          new MouseEvent('click') as unknown as React.MouseEvent<
            Element,
            MouseEvent
          >
        );
      }
    } else if (parsedValidDate) {
      // parsedValidDate가 Date 객체이면 유효한 것
      // 유효한 날짜
      if (!initialValue || !isSameDay(initialValue, parsedValidDate)) {
        onChangeCallback(
          parsedValidDate,
          parsedValidDate,
          {} as ActiveModifiers,
          new MouseEvent('click') as unknown as React.MouseEvent<
            Element,
            MouseEvent
          >
        );
      }
    }
  }, [date, onChangeCallback, initialValue]);

  useEffect(() => {
    handleValidationAndChange();
  }, [date, handleValidationAndChange]);

  // initialValue 변경 감지 및 상태 동기화
  useEffect(() => {
    if (initialValue && isValid(initialValue)) {
      // isValid는 date-fns에서 온 것
      const newYear = format(initialValue, 'yyyy');
      const newMonth = format(initialValue, 'MM');
      const newDay = format(initialValue, 'dd');
      if (
        date.year !== newYear ||
        date.month !== newMonth ||
        date.day !== newDay
      ) {
        setDate({ year: newYear, month: newMonth, day: newDay });
      }
    } else if (initialValue === undefined) {
      // 외부에서 value가 undefined로 명시적으로 변경되었을 때,
      // 내부 입력 필드도 비울지 여부는 UX 정책에 따라 결정합니다.
      // 사용자가 직접 지우는 중일 수도 있으므로, 무조건 비우는 것은 좋지 않을 수 있습니다.
      // 만약 반드시 비워야 한다면 아래 주석 해제:
      // if (date.year || date.month || date.day) { // 현재 입력값이 있는 경우에만
      //   setDate({ year: '', month: '', day: '' });
      // }
    }
  }, [initialValue]);

  return {
    date,
    yearRef,
    monthRef,
    dayRef,
    handleInputChange,
    isMonthInvalid,
    isDayInvalidBasic,
    isDateCompositionInvalid,
    defaultCalendarMonth: initialValue || new Date(),
  };
}
