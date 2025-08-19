import { Clock, Edit3 } from 'lucide-react';
import { useState } from 'react';

import { ModeSwitch } from '@/shared/ui/mode-switch';
import type { ModeOption } from '@/shared/ui/mode-switch/types';

import AddMyBookHistoryTimeController from './add-my-book-history-time-controller';
import AddMyBookHistoryTimerController from './add-my-book-history-timer-controller';

type Mode = 'timer' | 'manual';

const modeOptions: ModeOption<Mode>[] = [
  { value: 'timer', label: '타이머', icon: Clock },
  { value: 'manual', label: '직접 입력', icon: Edit3 },
];

interface AddMyBookHistoryTimeStepProps {
  date: Date;
}

export default function AddMyBookHistoryTimeStep({
  date,
}: AddMyBookHistoryTimeStepProps) {
  const [mode, setMode] = useState<Mode>('timer');

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full h-auto my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <ModeSwitch
          options={modeOptions}
          value={mode}
          onValueChange={setMode}
          className="mb-4"
        />
        {mode === 'timer' && <AddMyBookHistoryTimerController date={date} />}
        {mode === 'manual' && <AddMyBookHistoryTimeController />}
      </div>
    </div>
  );
}
