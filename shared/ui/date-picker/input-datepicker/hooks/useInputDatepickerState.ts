import { useCallback, MouseEvent } from 'react';
import { SelectSingleEventHandler } from 'react-day-picker';
import { useInputDatepickerValidation } from './useInputDatepickerValidation';
import { useInputDatepicker } from './useInputDatepicker';

export interface UseInputDatepickerStateProps {
  value: Date | undefined;
  onChange: SelectSingleEventHandler;
  externalError?: boolean;
}

export interface UseInputDatepickerStateReturn {
  // State
  hasError: boolean;
  error: string | null;
  dateStr: string;

  // Handlers
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCalendarSelect: SelectSingleEventHandler;
  handleClearDate: (e: MouseEvent) => void;

  // Computed values
  getState: () => 'default' | 'error';
}

export const useInputDatepickerState = ({
  value,
  onChange,
  externalError,
}: UseInputDatepickerStateProps): UseInputDatepickerStateReturn => {
  const validation = useInputDatepickerValidation();

  const dateInput = useInputDatepicker({
    value,
    onChange,
    onError: validation.setError,
    validateInput: validation.validateInput,
  });

  const hasError = Boolean(validation.error || externalError);

  const handleClearDate = useCallback(
    (e: MouseEvent) => {
      onChange(undefined, new Date(), {}, e);
      dateInput.clearDateInput();
    },
    [onChange, dateInput]
  );

  const getState = useCallback(() => {
    if (hasError) return 'error';
    return 'default';
  }, [hasError]);

  return {
    // State
    hasError,
    error: validation.error,
    dateStr: dateInput.dateStr,

    // Handlers
    handleInputChange: dateInput.handleInputChange,
    handleCalendarSelect: dateInput.handleCalendarSelect,
    handleClearDate,

    // Computed values
    getState,
  };
};
