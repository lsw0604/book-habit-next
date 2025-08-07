import { startOfToday } from 'date-fns';

import { Timer } from '@/shared/ui/timer';
import { useTimer } from '@/shared/ui/timer/hooks';

import { AddMyBookHistorySetValueProps } from '../model/types';

export default function AddMyBookHistoryTimerController({
  setValue,
}: AddMyBookHistorySetValueProps) {
  const hooks = useTimer({
    onStart() {
      setValue('startTime', new Date());
    },
    onStop(elapsedSeconds) {
      setValue('endTime', new Date());
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
    <div className="w-full h-auto my-2 p-4 rounded-lg border-none shadow-lg flex items-center justify-center hover:shadow-2xl bg-white/50 backdrop-blur-sm transition-shadow duration-200">
      <Timer {...hooks} />
    </div>
  );
}
