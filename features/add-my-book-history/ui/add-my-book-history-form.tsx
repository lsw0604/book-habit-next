import { useFormContext } from 'react-hook-form';

import { closeModal } from '@/entities/modal/store';
import { useAddMyBookHistory } from '@/entities/my-book-history/hooks';
import { useAppDispatch } from '@/shared/redux/store';
import { Button } from '@/shared/ui/button';

import { useMultiStepForm } from '../hooks';
import { AddMyBookHistoryType } from '../model';

import AddMyBookHistoryMemoStep from './components/add-my-book-history-memo-step';
import AddMyBookHistoryMoodStep from './components/add-my-book-history-mood-step';
import AddMyBookHistoryPageStep from './components/add-my-book-history-page-step';
import AddMyBookHistoryTimeStep from './components/add-my-book-history-time-step';
import { STEP_CONFIG, STEPS } from './constants';

interface AddMyBookHistoryFormProps {
  date: Date;
}
export function AddMyBookHistoryForm({ date }: AddMyBookHistoryFormProps) {
  const {
    formState: { isSubmitting },
    handleSubmit,
  } = useFormContext<AddMyBookHistoryType>();
  const dispatch = useAppDispatch();

  const { mutate } = useAddMyBookHistory();
  const { currentStep, handleNextStep, handlePrevStep } = useMultiStepForm();

  const onSubmit = (data: AddMyBookHistoryType) => {
    mutate(data, {
      onSuccess: () => {
        dispatch(closeModal());
      },
    });
  };

  const renderCurrentStep = () => {
    const stepComponents = {
      [STEPS.TIME]: <AddMyBookHistoryTimeStep date={date} />,
      [STEPS.MOOD]: <AddMyBookHistoryMoodStep />,
      [STEPS.PAGE]: <AddMyBookHistoryPageStep />,
      [STEPS.MEMO]: <AddMyBookHistoryMemoStep />,
    };

    return stepComponents[currentStep as keyof typeof stepComponents] || null;
  };

  const progress = (currentStep / STEPS.LAST) * 100;

  const currentStepTitle =
    STEP_CONFIG[currentStep as keyof typeof STEP_CONFIG]?.title || '';

  const isFirstStep = currentStep === STEPS.FIRST;
  const isLastStep = currentStep === STEPS.LAST;

  return (
    <>
      <div className="mb-4">
        <div className="text-center text-xl font-semibold text-gray-800 mb-2">
          {currentStepTitle}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-grow"
      >
        <div className="flex-grow min-h-[250px]">{renderCurrentStep()}</div>
        <div className="flex w-full items-center justify-between gap-4 mt-6">
          {!isFirstStep && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevStep}
              className="w-1/2"
            >
              이전
            </Button>
          )}
          <div className="flex-grow" />
          {isLastStep && (
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-1/2"
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </Button>
          )}
          {!isLastStep && (
            <Button
              type="button"
              onClick={handleNextStep}
              className="w-1/2"
              disabled={isLastStep}
            >
              다음
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
