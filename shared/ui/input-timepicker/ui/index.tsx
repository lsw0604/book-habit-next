import { ClockIcon } from 'lucide-react';
import { useId, useRef } from 'react';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';
import { cn } from '@/shared/utils/class-name';

import { useTimepicker } from '../hooks/useTimepicker';

import { TimeInput } from './time-input';
import { timepickerVariants } from './variants';

interface TimePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  id?: string;
  className?: string;
  label?: string;
  errorMessage?: string;
  isError?: boolean;
}

export default function InputTimepicker({
  value,
  onChange,
  id,
  className,
  label,
  errorMessage,
  isError,
}: TimePickerProps) {
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  /**
   * 한 화면에 여러 개가 놓이므로 id는 인스턴스마다 달라야 한다.
   * 예전에는 분·초가 "minutes"/"seconds"로 고정돼 있어
   * 시작/종료 시간을 함께 그리면 같은 id가 중복됐다.
   */
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const hourId = `${baseId}-hours`;

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
    <div className={cn('flex flex-col group', className)}>
      {label && (
        <Label htmlFor={hourId} className="text-xs ml-1 mb-2 font-bold">
          {label}
        </Label>
      )}
      <div className={timepickerVariants({ error: isError })}>
        <ClockIcon className="mr-2" size={16} />
        <div className="flex w-full items-center h-full">
          <TimeInput
            id={hourId}
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
            id={`${baseId}-minutes`}
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
            id={`${baseId}-seconds`}
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
      {isError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
