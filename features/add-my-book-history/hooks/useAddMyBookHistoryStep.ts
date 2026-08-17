'use client';

import { useCallback, useState } from 'react';
import { type FieldErrors, useFormContext } from 'react-hook-form';

import {
  ADD_MY_BOOK_HISTORY_LAST_STEP_INDEX,
  ADD_MY_BOOK_HISTORY_STEPS,
  type AddMyBookHistoryType,
} from '../schema';

/**
 * 등록 폼을 단계별로 진행시키는 훅.
 *
 * 전체 스키마는 제출 시점에만 resolver로 검증하고,
 * "다음" 버튼은 현재 단계 스키마만 직접 파싱해 해당 필드에 에러를 심는다.
 */
export function useAddMyBookHistoryStep() {
  const { getValues, setError, clearErrors } =
    useFormContext<AddMyBookHistoryType>();
  const [stepIndex, setStepIndex] = useState<number>(0);

  const step = ADD_MY_BOOK_HISTORY_STEPS[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === ADD_MY_BOOK_HISTORY_LAST_STEP_INDEX;

  const validateStep = useCallback(() => {
    clearErrors(step.fields);

    const result = step.schema.safeParse(getValues());
    if (result.success) return true;

    result.error.issues.forEach(issue => {
      const [field] = issue.path;
      if (typeof field !== 'string') return;
      setError(field as keyof AddMyBookHistoryType, {
        type: 'manual',
        message: issue.message,
      });
    });

    return false;
  }, [clearErrors, getValues, setError, step]);

  const goNext = useCallback(() => {
    if (isLastStep || !validateStep()) return;
    setStepIndex(prev => prev + 1);
  }, [isLastStep, validateStep]);

  const goPrev = useCallback(() => {
    setStepIndex(prev => Math.max(0, prev - 1));
  }, []);

  /** 이미 지나온 단계로만 이동한다. */
  const goToStep = useCallback((index: number) => {
    setStepIndex(prev => (index < prev ? index : prev));
  }, []);

  /** 제출 검증에 실패했을 때, 에러가 있는 첫 단계를 보여준다. */
  const focusErrorStep = useCallback(
    (errors: FieldErrors<AddMyBookHistoryType>) => {
      const errorStepIndex = ADD_MY_BOOK_HISTORY_STEPS.findIndex(
        ({ fields }) => fields.some(field => !!errors[field])
      );
      if (errorStepIndex >= 0) setStepIndex(errorStepIndex);
    },
    []
  );

  return {
    steps: ADD_MY_BOOK_HISTORY_STEPS,
    step,
    stepIndex,
    isFirstStep,
    isLastStep,
    goNext,
    goPrev,
    goToStep,
    focusErrorStep,
  };
}
