import { Clock, Edit3 } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { AddMyBookHistoryType } from '@/entities/my-book-history';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ErrorMessage } from '@/shared/ui/error-message';
import { ModeSwitch } from '@/shared/ui/mode-switch';
import type { ModeOption } from '@/shared/ui/mode-switch/types';

import {
  AddMyBookHistoryTimeContainer,
  AddMyBookHistoryTimerContainer,
} from '../containers';

type Mode = 'timer' | 'manual';

const modeOptions: ModeOption<Mode>[] = [
  { value: 'timer', label: '타이머', icon: Clock },
  { value: 'manual', label: '직접 입력', icon: Edit3 },
];

interface AddMyBookHistoryTimeCardProps {
  date: Date;
}

export function AddMyBookHistoryTimeCard({
  date,
}: AddMyBookHistoryTimeCardProps) {
  const [mode, setMode] = useState<Mode>('timer');
  const {
    formState: { errors },
  } = useFormContext<AddMyBookHistoryType>();

  return (
    <Card className="gap-2 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>
          독서 시간 기록<span className="ml-2 text-red-500">*</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ModeSwitch
          options={modeOptions}
          value={mode}
          onValueChange={setMode}
          className="mb-4"
        />
        {mode === 'timer' && <AddMyBookHistoryTimerContainer date={date} />}
        {mode === 'manual' && <AddMyBookHistoryTimeContainer />}
      </CardContent>
      <CardFooter className="flex-col">
        {errors.endTime?.message && (
          <ErrorMessage className="mr-auto">
            {errors.endTime.message}
          </ErrorMessage>
        )}
        {errors.startTime?.message && (
          <ErrorMessage className="mr-auto">
            {errors.startTime.message}
          </ErrorMessage>
        )}
        {errors.readingMinutes?.message && (
          <ErrorMessage className="mr-auto">
            {errors.readingMinutes.message}
          </ErrorMessage>
        )}
      </CardFooter>
    </Card>
  );
}
