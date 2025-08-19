import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Timer } from '@/shared/ui/timer';
import { useTimer } from '@/shared/ui/timer/hooks';

import { AddMyBookHistoryType } from '../../model';

interface AddMyBookHistoryTimerControllerProps {
  date: Date;
}

export default function AddMyBookHistoryTimerController({
  date,
}: AddMyBookHistoryTimerControllerProps) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<AddMyBookHistoryType>();

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

  return (
    <>
      <Timer {...hooks} />
      {!!errors.readingMinutes?.message && (
        <ErrorMessage className="mt-2 text-left ml-2">
          {errors.readingMinutes?.message}
        </ErrorMessage>
      )}
      {!!errors.startTime?.message && (
        <ErrorMessage className="mt-2 text-left ml-2">
          {errors.startTime?.message}
        </ErrorMessage>
      )}
      {!!errors.endTime?.message && (
        <ErrorMessage className="mt-2 text-left ml-2">
          {errors.endTime?.message}
        </ErrorMessage>
      )}
    </>
  );
}
