import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FormEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { useModal } from '@/entities/modal';
import { Button } from '@/shared/ui/button';
import { StepIndicator } from '@/shared/ui/step-indicator';

import { useAddMyBookHistory, useAddMyBookHistoryStep } from '../../hooks';
import type { AddMyBookHistoryType } from '../../schema';

import { AddMyBookHistoryStepContent } from './components';

export function AddMyBookHistoryForm() {
  const {
    formState: { isSubmitting },
    handleSubmit,
    getValues,
  } = useFormContext<AddMyBookHistoryType>();
  const { close } = useModal();

  const myBookId = getValues('myBookId');
  const date = getValues('date');

  const { mutate } = useAddMyBookHistory({ myBookId });
  const {
    steps,
    step,
    stepIndex,
    isFirstStep,
    isLastStep,
    goNext,
    goPrev,
    goToStep,
    focusErrorStep,
  } = useAddMyBookHistoryStep();

  const onSubmit = (data: AddMyBookHistoryType) => {
    mutate(data, {
      onSuccess: () => {
        close();
      },
    });
  };

  // 마지막 단계가 아니면 전체 검증 대신 다음 단계로만 이동한다.
  // (입력 중 Enter 키로 submit 되는 경우도 여기서 걸린다.)
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isLastStep) {
      e.preventDefault();
      goNext();
      return;
    }
    handleSubmit(onSubmit, focusErrorStep)(e);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex-1 flex flex-col min-h-0"
      noValidate
    >
      <div className="shrink-0 px-4 pt-4">
        <StepIndicator
          steps={steps}
          currentIndex={stepIndex}
          onStepSelect={goToStep}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none p-4">
        <p className="mb-3 text-sm text-muted-foreground">{step.description}</p>
        <div className="min-h-[280px]">
          <AddMyBookHistoryStepContent stepId={step.id} date={date} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-100 flex gap-3">
        {!isFirstStep && (
          <Button
            key="prev-btn"
            type="button"
            variant="outline"
            onClick={goPrev}
            className="flex-1"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            이전
          </Button>
        )}
        {isLastStep ? (
          <Button
            key="submit-btn"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        ) : (
          <Button
            key="next-btn"
            type="button"
            onClick={goNext}
            className="flex-1"
          >
            다음
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
