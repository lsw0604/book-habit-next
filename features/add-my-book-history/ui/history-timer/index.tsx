import {
  PauseCircle,
  PlayCircle,
  PlayIcon,
  RotateCcw,
  StopCircle,
} from 'lucide-react';
import { type UseFormSetValue } from 'react-hook-form';

import { Button } from '@/shared/ui/button';

import { AddMyBookHistoryType } from '../../model/schema';

import { formatTimer } from './formatter';
import { useTimer } from './useHistoryTimer';

interface AddMyBookHistoryTimerProps {
  setValue: UseFormSetValue<AddMyBookHistoryType>;
}

export function HistoryTimer({ setValue }: AddMyBookHistoryTimerProps) {
  const {
    elapsedSeconds,
    handlePause,
    handleReset,
    handleResume,
    handleStart,
    handleStop,
    status,
  } = useTimer({ setValue });

  return (
    <div className="flex flex-col items-center gap-1">
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
              {/* ✅ Paused 상태에서도 Stop 버튼을 보여줌 */}
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
