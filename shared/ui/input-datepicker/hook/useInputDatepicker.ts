import { format } from 'date-fns';
import {
  type ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';

import { INPUT_DATEPICKER_CONSTRAINTS } from '../lib/constants';
import { extractDigits, addSeparatorsToDateString } from '../lib/formatter';
import { validatePartialDate, parseAndValidateDate } from '../lib/validator';

interface UseInputDatepickerProps {
  value: Date | undefined;
  onChange: SelectSingleEventHandler;
  externalError?: boolean;
}

interface UseInputDatepickerReturn {
  dateStr: string;
  error: string | null;
  hasError: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCalendarSelect: SelectSingleEventHandler;
  handleClearDate: (e: MouseEvent) => void;
}

export const useInputDatepicker = ({
  value,
  onChange,
  externalError,
}: UseInputDatepickerProps): UseInputDatepickerReturn => {
  const [dateStr, setDateStr] = useState<string>(() =>
    value ? format(value, 'yyyy-MM-dd') : ''
  );
  const [internalError, setInternalError] = useState<string | null>(null);

  const hasError = Boolean(internalError || externalError);

  /**
   * 우리가 올려보낸 값이 그대로 되돌아온 것인지 구분하는 기준.
   *
   * 입력 도중에는 "2025-0"처럼 날짜가 되지 못하는 문자열을 들고 있어야 하는데,
   * 그 시점의 value는 undefined다. 이걸 외부 초기화와 구분하지 못하면
   * 타이핑하는 족족 입력칸이 지워진다.
   */
  const emittedRef = useRef<Date | undefined>(value);

  const notifyChange = useCallback(
    (day: Date | undefined, e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
      emittedRef.current = day;
      onChange(day, day || new Date(), {}, e as MouseEvent);
    },
    [onChange]
  );

  // 폼 reset처럼 밖에서 값이 바뀐 경우에만 입력칸을 값에 맞춘다
  useEffect(() => {
    if (value === emittedRef.current) return;

    emittedRef.current = value;
    setDateStr(value ? format(value, 'yyyy-MM-dd') : '');
    setInternalError(null);
  }, [value]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const digits = extractDigits(
        e.target.value,
        INPUT_DATEPICKER_CONSTRAINTS.MAX_DIGITS
      );
      const formattedInput = addSeparatorsToDateString(digits);
      setDateStr(formattedInput);

      let newDate: Date | null = null;
      let newError: string | null = null;

      const partialError = validatePartialDate(digits);

      if (partialError) {
        // 부분적인 날짜 형식이 유효하지 않은 경우
        newError = partialError;
      } else if (digits.length === INPUT_DATEPICKER_CONSTRAINTS.MAX_DIGITS) {
        // 날짜가 모두 입력된 경우 (8자리)
        const { date, error: fullError } = parseAndValidateDate(digits);

        if (fullError) {
          // 유효하지 않은 날짜인 경우
          newError = fullError;
        } else {
          newDate = date;
        }
      }
      // 3. 내부 에러 상태를 업데이트합니다.
      setInternalError(newError);

      if (newDate) {
        if (!value || newDate.getTime() !== value.getTime()) {
          notifyChange(newDate, e);
        }
      } else if (value) {
        // 입력을 지우면 날짜도 지워줌
        notifyChange(undefined, e);
      }
    },
    [value, notifyChange]
  );

  const handleCalendarSelect: SelectSingleEventHandler = useCallback(
    (day, ...rest) => {
      emittedRef.current = day;
      onChange(day, ...rest);
      setInternalError(null);
      setDateStr(day ? format(day, 'yyyy-MM-dd') : '');
    },
    [onChange]
  );

  const handleClearDate = useCallback(
    (e: MouseEvent) => {
      notifyChange(undefined, e);
      setDateStr('');
      setInternalError(null);
    },
    [notifyChange]
  );

  return {
    dateStr,
    error: internalError,
    hasError,
    handleInputChange,
    handleCalendarSelect,
    handleClearDate,
  };
};
