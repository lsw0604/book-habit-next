import type { SelectSingleEventHandler } from 'react-day-picker';
import {
  type ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  extractDigits,
  formatDateObjectToString,
  addSeparatorsToDateString,
} from '../lib/formatter';
import { validatePartialDate, parseAndValidateDate } from '../lib/validator';
import { DATE_CONSTRAINTS } from '../lib/constants';

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
  }, [value]);

  const notifyChange = useCallback(
    (day: Date | undefined, e: ChangeEvent<HTMLInputElement> | MouseEvent) => {
      onChange(day, day || new Date(), {}, e as any);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const digits = extractDigits(e.target.value, DATE_CONSTRAINTS.MAX_DIGITS);
      const formattedInput = addSeparatorsToDateString(digits);
      setDateStr(formattedInput);
      setInternalError(null);

      // 유효성 검사 통합 로직
      const stepError = validatePartialDate(digits);
      if (stepError) {
        setInternalError(stepError);
        onChange(undefined, new Date(), {}, e as any);
        return;
      }

      if (digits.length === DATE_CONSTRAINTS.MAX_DIGITS) {
        const { date, error } = parseAndValidateDate(digits);

        if (error) {
          setInternalError(error);
          notifyChange(undefined, e);
          return;
        }

        if (date && value?.getTime() !== date.getTime()) {
          notifyChange(date, e);
        }
      } else if (value) {
        notifyChange(undefined, e);
      }
    },
    [value, onChange]
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
    [onChange]
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
