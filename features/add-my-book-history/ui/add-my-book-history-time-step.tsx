import { Clock, Edit3 } from 'lucide-react';
import { useState } from 'react';
import type {
  Control,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';

import { ModeSwitch } from '@/shared/ui/mode-switch';
import { ModeOption } from '@/shared/ui/mode-switch/types';

import { AddMyBookHistoryType } from '../model/schema';

import AddMyBookHistoryTimeController from './add-my-book-history-time-controller';
import AddMyBookHistoryTimerController from './add-my-book-history-timer-controller';

type Mode = 'timer' | 'manual';

const modeOptions: ModeOption<Mode>[] = [
  { value: 'timer', label: '타이머 모드', icon: Clock },
  { value: 'manual', label: '직접 입력', icon: Edit3 },
];

interface AddMyBookHistoryTimeStepProps {
  control: Control<AddMyBookHistoryType>;
  setValue: UseFormSetValue<AddMyBookHistoryType>;
  getValues: UseFormGetValues<AddMyBookHistoryType>;
  date: Date;
}

export default function AddMyBookHistoryTimeStep({
  date,
  control,
  setValue,
  getValues,
}: AddMyBookHistoryTimeStepProps) {
  const [mode, setMode] = useState<Mode>('timer');

  return (
    <div className="flex flex-col gap-4">
      <ModeSwitch options={modeOptions} value={mode} onValueChange={setMode} />
      {mode === 'timer' && (
        <AddMyBookHistoryTimerController date={date} setValue={setValue} />
      )}
      {mode === 'manual' && (
        <AddMyBookHistoryTimeController
          getValues={getValues}
          setValue={setValue}
          control={control}
        />
      )}
    </div>
  );
}
