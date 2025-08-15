import { parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useAddMyBookHistory } from '@/entities/my-book-history/hooks';
import { myBookHistorySelector } from '@/entities/my-book-history/store';
import { useAppSelector } from '@/shared/redux/store';
import { Button } from '@/shared/ui/button';

import { useAddMyBookHistoryForm } from '../hooks/useAddMyBookHistoryForm';
import {
  AddMyBookHistoryType,
  DEFAULT_ADD_MY_BOOK_HISTORY,
} from '../model/schema';

import AddMyBookHistoryMemoController from './add-my-book-history-memo-controller';
import AddMyBookHistoryMoodController from './add-my-book-history-mood-controller';
import AddMyBookHistoryPageController from './add-my-book-history-page-controller';
import AddMyBookHistoryTimeStep from './add-my-book-history-time-step';

const LAST_STEP = 4;
const FIRST_STEP = 1;

export default function RegisterMyBookHistoryModal() {
  const params = useParams();
  const { selectedDate } = useAppSelector(myBookHistorySelector);
  const { my_book_id: myBookId } = params;
  const parsedMyBookId = parseInt(myBookId as string, 10);
  const date = selectedDate ? parseISO(selectedDate) : new Date();
  const [currentStep, setCurrentStep] = useState<number>(FIRST_STEP);

  const {
    control,
    setValue,
    register,
    trigger,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useAddMyBookHistoryForm({
    ...DEFAULT_ADD_MY_BOOK_HISTORY,
    myBookId: parsedMyBookId,
    startTime: date,
    endTime: date,
    date,
  });

  const { mutate } = useAddMyBookHistory();

  const stepFields = useMemo(() => {
    switch (currentStep) {
      case 1: // Time Step
        return [
          'startTime',
          'endTime',
          'readingMinutes',
        ] as (keyof AddMyBookHistoryType)[];
      case 2: // Mood Step
        return ['readingMood'] as (keyof AddMyBookHistoryType)[];
      case 3: // Page Step
        return ['startPage', 'endPage'] as (keyof AddMyBookHistoryType)[];
      case 4: // Memo Step
        return ['memo'] as (keyof AddMyBookHistoryType)[];
      default:
        return [];
    }
  }, [currentStep]);

  if (!myBookId || typeof myBookId !== 'string') return null;

  const handleNextStep = async () => {
    const isValid = await trigger(stepFields);

    if (isValid) {
      if (currentStep < LAST_STEP) {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      console.log(
        'Validation failed for fields:',
        stepFields,
        'Errors:',
        errors
      );
    }
  };

  const handlePrevStep = () => {
    if (currentStep > FIRST_STEP) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data: AddMyBookHistoryType) => {
    mutate(data);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AddMyBookHistoryTimeStep
            date={date}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        );
      case 2:
        return <AddMyBookHistoryMoodController control={control} />;
      case 3:
        return <AddMyBookHistoryPageController register={register} />;
      case 4:
        return <AddMyBookHistoryMemoController control={control} />;
      default:
        return null;
    }
  };

  const progress = (currentStep / LAST_STEP) * 100;

  return (
    <>
      <div className="mb-4">
        <div className="text-center text-xl font-semibold text-gray-800 mb-2">
          {
            ['독서 시간 기록', '독서 감정 선택', '페이지 기록', '메모 작성'][
              currentStep - 1
            ]
          }
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
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
          {currentStep > FIRST_STEP && (
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
          {currentStep < LAST_STEP ? (
            <Button type="button" onClick={handleNextStep} className="w-1/2">
              다음
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              className="w-1/2"
            >
              {isSubmitting ? '등록 중...' : '등록하기'}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}
