import {
  type ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';

import { formatDateObjectToString } from '@/shared/utils/date';

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
  const [dateStr, setDateStr] = useState<string>('');
  const [internalError, setInternalError] = useState<string | null>(null);

  const hasError = Boolean(internalError || externalError);

  useEffect(() => {
    if (value) {
      const newDateStr = formatDateObjectToString(value);
      if (dateStr !== newDateStr) {
        setDateStr(newDateStr);
      }
      setInternalError(null);
    }
  }, [value, dateStr]);

  const notifyChange = useCallback(
    (day: Date | undefined, e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
      onChange(day, day || new Date(), {}, e as MouseEvent);
    },
    [onChange]
  );

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
      onChange(day, ...rest);
      setInternalError(null);

      // Calendar에서 날짜 선택 해제에 대한 동작
      if (day === undefined) {
        setDateStr('');
      }
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
