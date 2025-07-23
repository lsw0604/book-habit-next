import { ClockIcon } from 'lucide-react';
import { useRef } from 'react';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';
import { cn } from '@/shared/utils/class-name';

import { useTimepicker } from '../hooks/useTimepicker';

import { TimeInput } from './time-input';

interface TimePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  label?: string;
  errorMessage?: string;
}

export default function InputTimepicker({
  value,
  onChange,
  className,
  label,
  errorMessage,
}: TimePickerProps) {
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  const { hour, minute, second, setTime, stepTime } = useTimepicker({
    date: value,
    setDate: onChange,
  });

  const handleStepHour = (stepNum: number) => {
    stepTime(stepNum, 'hours');
  };

  const handleStepMinute = (stepNum: number) => {
    stepTime(stepNum, 'minutes');
  };

  const handleStepSecond = (stepNum: number) => {
    stepTime(stepNum, 'seconds');
  };

  return (
    <div className={cn('flex flex-col')}>
      {label && (
        <Label htmlFor="hours" className="text-xs ml-1 font-bold">
          {label}
        </Label>
      )}
      <div
        className={cn(
          'flex items-center w-auto h-10 px-2',
          'text-xl text-slate-600 text-center font-mono',
          'border-solid border-2 border-slate-600 rounded-md',
          className
        )}
      >
        <ClockIcon className="mr-2" size={16} />
        <div className="flex items-center h-full">
          <TimeInput
            id="hours"
            label="시"
            ref={hourRef}
            value={hour}
            onRightFocus={() => minuteRef.current?.focus()}
            onLeftFocus={() => secondRef.current?.focus()}
            setValue={stepNum => setTime(stepNum, 'hours')}
            stepTime={handleStepHour}
            max={23}
            aria-label="hours"
          />
          <TimeInput
            id="minutes"
            label="분"
            ref={minuteRef}
            value={minute}
            setValue={stepNum => setTime(stepNum, 'minutes')}
            stepTime={handleStepMinute}
            onRightFocus={() => secondRef.current?.focus()}
            onLeftFocus={() => hourRef.current?.focus()}
            max={59}
            aria-label="minutes"
          />
          <TimeInput
            id="seconds"
            label="초"
            ref={secondRef}
            value={second}
            setValue={stepNum => setTime(stepNum, 'seconds')}
            stepTime={handleStepSecond}
            onRightFocus={() => hourRef.current?.focus()}
            onLeftFocus={() => minuteRef.current?.focus()}
            max={59}
            aria-label="seconds"
          />
        </div>
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
