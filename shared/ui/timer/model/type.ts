export type TimerStatusType = 'idle' | 'running' | 'paused' | 'stopped';

export interface UseTimerProps {
  onStart?: () => void;
  onStop?: (elapsedSeconds: number) => void;
  onPause?: () => void;
  onResume?: () => void;
  onReset?: () => void;
}

export interface ReturnUseTimer {
  handlePause: () => void;
  handleReset: () => void;
  handleResume: () => void;
  handleStart: () => void;
  handleStop: () => void;
  status: TimerStatusType;
  elapsedSeconds: number;
}

export interface TimerProps
  extends Partial<Omit<ReturnUseTimer, 'status' | 'elapsedSeconds'>>,
    Pick<ReturnUseTimer, 'status' | 'elapsedSeconds'> {}
