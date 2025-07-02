import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { formatDateForInput, formatDateInput, extractDigits } from '../lib';
import { DATE_CONSTRAINTS } from '../constants';

export interface UseInputDatepickerProps {
  value: Date | undefined;
  onChange: SelectSingleEventHandler;
  onError: (error: string | null) => void;
  validateInput: (digits: string) => { isValid: boolean; date?: Date };
}

export interface UseInputDatepickerReturn {
  dateStr: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCalendarSelect: SelectSingleEventHandler;
  clearDateInput: () => void;
}

export const useInputDatepicker = ({
  value,
  onChange,
  onError,
  validateInput,
}: UseInputDatepickerProps): UseInputDatepickerReturn => {
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    if (value) {
      setDateStr(formatDateForInput(value));
      onError(null);
    }
  }, [value, onError]);

  const clearDateInput = useCallback(() => {
    setDateStr('');
    onError(null);
  }, [onError]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const digits = extractDigits(e.target.value, DATE_CONSTRAINTS.MAX_DIGITS);
      const formattedInput = formatDateInput(digits);

      setDateStr(formattedInput);
      onError(null);

      const validation = validateInput(digits);

      if (!validation.isValid) {
        if (value) onChange(undefined, new Date(), {}, e as any);
        return;
      }

      if (validation.date && value?.getTime() !== validation.date.getTime()) {
        onChange(validation.date, validation.date, {}, e as any);
      } else if (!validation.date && value) {
        onChange(undefined, new Date(), {}, e as any);
      }
    },
    [value, onChange, onError, validateInput]
  );

  const handleCalendarSelect: SelectSingleEventHandler = useCallback(
    (day, ...rest) => {
      onChange(day, ...rest);
      onError(null);
    },
    [onChange, onError]
  );

  return {
    dateStr,
    handleInputChange,
    handleCalendarSelect,
    clearDateInput,
  };
};
