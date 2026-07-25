import { useFormContext } from 'react-hook-form';

import { Timer } from '@/shared/ui/timer';
import { useTimer } from '@/shared/ui/timer/hooks';

import type { AddMyBookHistoryType } from '../../../schema';

interface AddMyBookHistoryTimerControllerProps {
  date: Date;
}

export function AddMyBookHistoryTimerContainer({
  date,
}: AddMyBookHistoryTimerControllerProps) {
  const { setValue } = useFormContext<AddMyBookHistoryType>();

  const hooks = useTimer({
    onStart() {
      setValue('startTime', date);
    },
    onStop(elapsedSeconds) {
      setValue('endTime', date);
      setValue('readingMinutes', Math.floor(elapsedSeconds / 60));
    },
    onReset() {
      setValue('startTime', date);
      setValue('endTime', date);
      setValue('readingMinutes', 0);
    },
  });

  return <Timer {...hooks} />;
}
