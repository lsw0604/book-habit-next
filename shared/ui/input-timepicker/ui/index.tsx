import { ClockIcon } from 'lucide-react';
import { useRef } from 'react';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';
import { cn } from '@/shared/utils/class-name';

import { useTimepicker } from '../hooks/useTimepicker';

import { TimeInput } from './time-input';
import { timepickerVariants } from './variants';

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
    <div className={cn('flex flex-col group')}>
      {label && (
        <Label
          htmlFor={`${label}-hours`}
          className="text-xs ml-1 mb-2 font-bold"
        >
          {label}
        </Label>
      )}
      <div
        className={timepickerVariants({ error: !!errorMessage, className })}
      >
        <ClockIcon className="mr-2" size={16} />
        <div className="flex w-full items-center h-full">
          <TimeInput
            id={`${label}-hours`}
            ref={hourRef}
            value={hour}
            onRightFocus={() => minuteRef.current?.focus()}
            onLeftFocus={() => secondRef.current?.focus()}
            setValue={stepNum => setTime(stepNum, 'hours')}
            stepTime={handleStepHour}
            max={23}
            aria-label="hours"
          />
          <span>:</span>
          <TimeInput
            id="minutes"
            ref={minuteRef}
            value={minute}
            setValue={stepNum => setTime(stepNum, 'minutes')}
            stepTime={handleStepMinute}
            onRightFocus={() => secondRef.current?.focus()}
            onLeftFocus={() => hourRef.current?.focus()}
            max={59}
            aria-label="minutes"
          />
          <span>:</span>
          <TimeInput
            id="seconds"
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
