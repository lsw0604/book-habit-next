import { useRef } from 'react';
import { TimeInput } from './time-input';
import { useTimePicker } from '../hook/useTimePicker';

interface TimePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const hourRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);

  const { hour, minute, second, setTime, stepTime } = useTimePicker({
    date: value,
    setDate: onChange,
  });

  const handleStepHour = () => {
    stepTime(1, 'hours');
    hourRef.current?.focus();
  };

  const handleStepMinute = () => {
    stepTime(1, 'minutes');
    minuteRef.current?.focus();
  };

  const handleStepSecond = () => {
    stepTime(1, 'seconds');
    secondRef.current?.focus();
  };

  return (
    <div className="flex items-center border rounded-md p-2 text-slate-600">
      <TimeInput
        ref={hourRef}
        value={hour}
        onRightFocus={() => minuteRef.current?.focus()}
        onLeftFocus={() => secondRef.current?.focus()}
        setValue={value => setTime(value, 'hours')}
        stepTime={handleStepHour}
        max={23}
        aria-label="hours"
      />
      <span>:</span>
      <TimeInput
        ref={minuteRef}
        value={minute}
        setValue={value => setTime(value, 'minutes')}
        stepTime={handleStepMinute}
        onRightFocus={() => secondRef.current?.focus()}
        onLeftFocus={() => hourRef.current?.focus()}
        max={59}
        aria-label="minutes"
      />
      <span>:</span>
      <TimeInput
        ref={secondRef}
        value={second}
        setValue={value => setTime(value, 'seconds')}
        stepTime={handleStepSecond}
        onRightFocus={() => hourRef.current?.focus()}
        onLeftFocus={() => minuteRef.current?.focus()}
        max={59}
        aria-label="seconds"
      />
    </div>
  );
}
