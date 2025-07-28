import {
  PauseCircle,
  PlayCircle,
  PlayIcon,
  RotateCcw,
  StopCircle,
} from 'lucide-react';

import { Button } from '@/shared/ui/button';

import { formatTimer } from '../lib/formatter';
import { TimerProps } from '../model/type';

export function Timer({
  elapsedSeconds,
  handlePause,
  handleStop,
  handleReset,
  handleResume,
  handleStart,
  status,
}: TimerProps) {
  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <div className="text-5xl font-mono font-bold tracking-wider bg-gray-50 w-full text-center py-8 rounded-md">
        {formatTimer(elapsedSeconds)}
      </div>
      <div className="flex gap-4 w-full justify-center">
        <div className="flex gap-4 w-full justify-center">
          {(status === 'idle' || status === 'stopped') && (
            <Button onClick={handleStart} className="flex-1 max-w-xs">
              <PlayCircle size={16} className="mr-2" />
              시작
            </Button>
          )}
          {status === 'running' && (
            <>
              <Button
                onClick={handlePause}
                variant="outline"
                className="flex-1"
              >
                <PauseCircle size={16} className="mr-2" />
                일시정지
              </Button>
              <Button
                onClick={handleStop}
                variant="destructive"
                className="flex-1"
              >
                <StopCircle size={16} className="mr-2" />
                정지
              </Button>
            </>
          )}
          {status === 'paused' && (
            <>
              <Button onClick={handleResume} className="flex-1">
                <PlayIcon size={16} className="mr-2" />
                다시시작
              </Button>
              <Button
                onClick={handleStop}
                variant="destructive"
                className="flex-1"
              >
                <StopCircle size={16} className="mr-2" />
                정지
              </Button>
            </>
          )}
        </div>
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex-1"
          disabled={status === 'idle' && elapsedSeconds === 0}
        >
          <RotateCcw size={14} className="mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
