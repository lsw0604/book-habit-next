import { startOfToday } from 'date-fns';
import { useEffect, useState } from 'react';
import { type UseFormSetValue } from 'react-hook-form';

import { type AddMyBookHistoryType } from '../../model/schema';

type TimerStatus = 'idle' | 'running' | 'paused' | 'stopped';

interface UseTimerProps {
  setValue: UseFormSetValue<AddMyBookHistoryType>;
}

export const useTimer = ({ setValue }: UseTimerProps) => {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (status === 'running') {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const handleStart = () => {
    setElapsedSeconds(0);
    setValue('startTime', new Date());
    setStatus('running');
  };

  const handlePause = () => setStatus('paused');
  const handleResume = () => setStatus('running');

  const handleStop = () => {
    setStatus('stopped');
    setValue('endTime', new Date());
    setValue('readingMinutes', Math.floor(elapsedSeconds / 60));
  };

  const handleReset = () => {
    const todayAtStart = startOfToday();
    setStatus('idle');
    setElapsedSeconds(0);
    setValue('startTime', todayAtStart);
    setValue('endTime', todayAtStart);
    setValue('readingMinutes', 0);
  };

  return {
    status,
    elapsedSeconds,
    handleStart,
    handlePause,
    handleResume,
    handleStop,
    handleReset,
  };
};
