import { useState, useCallback } from 'react';
import { validateInputStep, validateCompleteDate } from '../lib';
import { DATE_CONSTRAINTS } from '../constants';

export interface UseInputDatepickerValidationReturn {
  error: string | null;
  setError: (error: string | null) => void;
  validateInput: (digits: string) => { isValid: boolean; date?: Date };
  clearError: () => void;
}

export const useInputDatepickerValidation =
  (): UseInputDatepickerValidationReturn => {
    const [error, setError] = useState<string | null>(null);

    const clearError = useCallback(() => {
      setError(null);
    }, []);

    const validateInput = useCallback((digits: string) => {
      // 단계별 유효성 검사
      const stepError = validateInputStep(digits);
      if (stepError) {
        setError(stepError);
        return { isValid: false };
      }

      // 완전한 날짜 검증
      if (digits.length === DATE_CONSTRAINTS.MAX_DIGITS) {
        const { date, error: dateError } = validateCompleteDate(digits);

        if (dateError) {
          setError(dateError);
          return { isValid: false };
        }

        return { isValid: true, date: date || undefined };
      }

      return { isValid: true };
    }, []);

    return {
      error,
      setError,
      validateInput,
      clearError,
    };
  };
