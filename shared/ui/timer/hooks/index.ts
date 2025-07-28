import { useEffect, useState } from 'react';

import { ReturnUseTimer, TimerStatusType, UseTimerProps } from '../model/type';

export const useTimer = ({
  onPause,
  onReset,
  onResume,
  onStart,
  onStop,
}: UseTimerProps): ReturnUseTimer => {
  const [status, setStatus] = useState<TimerStatusType>('idle');
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

  const handleStop = () => {
    setStatus('stopped');
    onStop?.(elapsedSeconds);
  };

  const handleStart = () => {
    setElapsedSeconds(0);
    setStatus('running');
    onStart?.();
  };

  const handlePause = () => {
    setStatus('paused');
    onPause?.();
  };

  const handleReset = () => {
    setElapsedSeconds(0);
    setStatus('idle');
    onReset?.();
  };

  const handleResume = () => {
    setStatus('running');
    onResume?.();
  };

  return {
    handleStop,
    handleStart,
    handlePause,
    handleReset,
    handleResume,
    elapsedSeconds,
    status,
  };
};
