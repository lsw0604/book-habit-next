import { parseISO } from 'date-fns';
import { Clock, Edit3 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import { myBookHistorySelector } from '@/entities/my-book-history/store';
import { useAppSelector } from '@/shared/redux/store';
import { Button } from '@/shared/ui/button';
import { ModeSwitch } from '@/shared/ui/mode-switch';
import { ModeOption } from '@/shared/ui/mode-switch/types';

import { useAddMyBookHistoryForm } from '../hooks/useAddMyBookHistoryForm';
import {
  AddMyBookHistoryType,
  DEFAULT_ADD_MY_BOOK_HISTORY,
} from '../model/schema';

import AddMyBookHistoryMemoController from './add-my-book-history-memo-controller';
import AddMyBookHistoryMoodController from './add-my-book-history-mood-controller';
import AddMyBookHistoryPageController from './add-my-book-history-page-controller';
import AddMyBookHistoryTimeController from './add-my-book-history-time-controller';
import AddMyBookHistoryTimerController from './add-my-book-history-timer-controller';

const LAST_STEP = 3;
const FIRST_STEP = 1;

type Mode = 'timer' | 'manual';

const modeOptions: ModeOption<Mode>[] = [
  { value: 'timer', label: '타이머 모드', icon: Clock },
  { value: 'manual', label: '직접 입력', icon: Edit3 },
];

export default function RegisterMyBookHistoryModal() {
  const params = useParams();
  const { selectedDate } = useAppSelector(myBookHistorySelector);
  const { my_book_id: myBookId } = params;
  const parsedMyBookId = parseInt(myBookId as string, 10);
  const date = selectedDate ? parseISO(selectedDate) : new Date();
  const [currentStep, setCurrentStep] = useState<number>(FIRST_STEP);
  const [mode, setMode] = useState<Mode>('timer');
  const {
    control,
    setValue,
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useAddMyBookHistoryForm({
    ...DEFAULT_ADD_MY_BOOK_HISTORY,
    myBookId: parsedMyBookId,
    date,
  });

  const stepFields = useMemo(() => {
    switch (currentStep) {
      case 1:
        // 1단계: startTime, endTime, readingMinutes 공통 검증
        return [
          'startTime',
          'endTime',
          'readingMinutes',
        ] as (keyof AddMyBookHistoryType)[];
      case 2:
        // 2단계: 기분
        return ['readingMood'] as (keyof AddMyBookHistoryType)[];
      case 3:
        // 3단계: 페이지
        return ['startPage', 'endPage'] as (keyof AddMyBookHistoryType)[];
      default:
        return [];
    }
  }, [currentStep]);

  if (!myBookId) return null;
  if (typeof myBookId !== 'string') return null;

  const handleNextStep = async () => {
    // 현재 단계의 필드들을 검증합니다.
    const isValid = await trigger(stepFields);

    if (isValid) {
      // 유효성 검사 성공 시 다음 단계로 이동
      if (currentStep < LAST_STEP) {
        setCurrentStep(prev => prev + 1);
      } else {
        // 마지막 단계인 경우, 최종 제출을 위한 handleSubmit을 호출합니다.
        // 이 부분은 <form onSubmit={handleSubmit(onSubmit)}>에 의해 처리되므로
        // 별도로 호출할 필요는 없지만, 필요에 따라 수동 호출도 가능합니다.
        // 예를 들어, 최종 제출 버튼을 클릭했을 때만 호출되도록 할 수 있습니다.
        console.log('모든 단계 유효성 검사 완료. 최종 제출 준비.');
        // handleSubmit(onSubmit)이 폼 제출 버튼에 연결될 것임
      }
    } else {
      console.log('유효성 검사 실패. 다음 단계로 이동할 수 없습니다.');
      // 사용자에게 에러 메시지를 보여주는 로직을 추가할 수 있습니다.
    }
  };

  const handlePrevStep = () => {
    if (currentStep > FIRST_STEP) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = (data: AddMyBookHistoryType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModeSwitch options={modeOptions} value={mode} onValueChange={setMode} />
      {mode === 'timer' && (
        <AddMyBookHistoryTimerController setValue={setValue} />
      )}
      {mode === 'manual' && (
        <AddMyBookHistoryTimeController control={control} />
      )}

      <AddMyBookHistoryMoodController control={control} />
      <AddMyBookHistoryPageController register={register} />
      <AddMyBookHistoryMemoController control={control} />

      <Button type="submit" className="w-full">
        등록하기
      </Button>
    </form>
  );
}
