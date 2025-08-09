import { startOfToday } from 'date-fns';

import { Timer } from '@/shared/ui/timer';
import { useTimer } from '@/shared/ui/timer/hooks';

import { AddMyBookHistorySetValueProps } from '../model/types';

export default function AddMyBookHistoryTimerController({
  setValue,
  date,
}: AddMyBookHistorySetValueProps) {
  const hooks = useTimer({
    onStart() {
      setValue('startTime', date);
    },
    onStop(elapsedSeconds) {
      setValue('endTime', date);
      setValue('readingMinutes', Math.floor(elapsedSeconds / 60));
    },
    onReset() {
      const todayAtStart = startOfToday();
      setValue('startTime', todayAtStart);
      setValue('endTime', todayAtStart);
      setValue('readingMinutes', 0);
    },
  });

  return (
    <div className="w-full h-auto my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center">
      <Timer {...hooks} />
    </div>
  );
}
