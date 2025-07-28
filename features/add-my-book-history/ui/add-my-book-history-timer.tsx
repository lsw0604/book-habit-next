import React, { useEffect, useState, useRef } from 'react';
import { PlayIcon, PauseIcon, StopCircle, TimerResetIcon } from 'lucide-react';
import { UseFormSetValue } from 'react-hook-form';
import { AddMyBookHistoryType } from '../model/schema';
import { format } from 'date-fns';

interface ReadingTimerProps {
  setValue: UseFormSetValue<AddMyBookHistoryType>;
}

export const ReadingTimer: React.FC<ReadingTimerProps> = ({ setValue }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0); // 총 경과 시간 (초)
  const [displayStartTime, setDisplayStartTime] = useState<Date | null>(null); // UI에 표시될 독서 시작 시각
  const [displayEndTime, setDisplayEndTime] = useState<Date | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // setInterval ID 저장

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = () => {
    return format(new Date(0, 0, 0, 0, 0, seconds), 'HH:mm:ss');
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      if (displayStartTime === null) {
        const now = new Date();
        setDisplayStartTime(now);
        setValue('startTime', now);
      }
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const readingMinutes = Math.round(seconds / 60);
    const now = new Date();

    setValue('readingMinutes', readingMinutes);
    setValue('endTime', now);

    setDisplayEndTime(now);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setValue('readingMinutes', 0);
    setValue('startTime', null);
    setValue('endTime', null);

    setSeconds(0);
    setDisplayStartTime(null);
    setDisplayEndTime(null);
  };

  const hasTimeElapsed = displayStartTime !== null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-full">
      <div className="text-center mb-4">
        <h3 className="text-xl font-medium text-gray-800 mb-2">독서 타이머</h3>
        <div className="text-4xl font-bold text-indigo-600 font-mono">
          {formatTime()}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        {/* 재생/일시정지 버튼 */}
        {!isRunning ? (
          <button
            type="button"
            onClick={handleStart}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 transition-colors"
            aria-label="Start"
          >
            <PlayIcon size={24} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePause}
            className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-full w-12 h-12 transition-colors"
            aria-label="Pause"
          >
            <PauseIcon size={24} />
          </button>
        )}

        {/* 종료 버튼: 타이머가 활성화 상태일 때 (시간이 기록되기 시작했을 때) 표시 */}
        {hasTimeElapsed && (
          <button
            type="button"
            onClick={handleStop}
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full w-12 h-12 transition-colors"
            aria-label="Stop"
          >
            <StopCircle size={24} />
          </button>
        )}

        {/* 리셋 버튼: 타이머가 활성화 상태일 때 (시간이 기록되기 시작했을 때) 표시 */}
        {hasTimeElapsed && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded-full w-12 h-12 transition-colors"
            aria-label="Reset"
          >
            <TimerResetIcon size={24} />
          </button>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        {displayStartTime ? (
          <p>독서 시작: {format(displayStartTime, '오후 hh:mm:ss')}</p>
        ) : (
          <p>시작하려면 재생 버튼을 누르세요</p>
        )}
      </div>
      {displayEndTime && (
        <div className="mt-1 text-sm text-gray-500 text-center">
          <p>독서 시작: {format(displayEndTime, '오후 hh:mm:ss')}</p>
        </div>
      )}
    </div>
  );
};
