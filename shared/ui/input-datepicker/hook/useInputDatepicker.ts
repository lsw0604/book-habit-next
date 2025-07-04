import type { SelectSingleEventHandler } from 'react-day-picker';
import { type ChangeEvent, useCallback, useEffect, useState } from 'react';
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
  handleClearDate: () => void;
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
      setDateStr(formatDateObjectToString(value));
      setInternalError(null);
    }
  }, [value]);

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
          onChange(undefined, new Date(), {}, e as any);
          return;
        }

        if (date && value?.getTime() !== date.getTime()) {
          onChange(date, date, {}, e as any);
        }
      } else if (value) {
        onChange(undefined, new Date(), {}, e as any);
      }
    },
    [value, onChange]
  );

  const handleCalendarSelect: SelectSingleEventHandler = useCallback(
    (day, ...rest) => {
      onChange(day, ...rest);
      setInternalError(null);
    },
    [onChange]
  );

  const handleClearDate = useCallback(() => {
    onChange(undefined, new Date(), {}, {} as any);
    setDateStr('');
    setInternalError(null);
  }, [onChange]);

  return {
    dateStr,
    error: internalError,
    hasError,
    handleInputChange,
    handleCalendarSelect,
    handleClearDate,
  };
};
