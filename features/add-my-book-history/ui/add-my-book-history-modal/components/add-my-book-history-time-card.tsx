import { Clock, Edit3 } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { ModeSwitch, type ModeOption } from '@/shared/ui/mode-switch';

import type { AddMyBookHistoryType } from '../../../schema';
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
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center">
        독서 시간 기록<span className="ml-1 text-red-500">*</span>
      </h3>
      <div>
        <ModeSwitch
          options={modeOptions}
          value={mode}
          onValueChange={setMode}
          className="mb-4"
        />
        {mode === 'timer' && <AddMyBookHistoryTimerContainer date={date} />}
        {mode === 'manual' && <AddMyBookHistoryTimeContainer />}
      </div>
      <div className="flex flex-col gap-1">
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
      </div>
    </div>
  );
}

